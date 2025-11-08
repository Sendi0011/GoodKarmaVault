// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/GoodKarmaVault.sol";

// Mock ERC20 for testing
contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 6;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        return true;
    }
}

// Mock Aave Pool
contract MockAavePool {
    mapping(address => uint256) public supplied;
    
    function supply(address asset, uint256 amount, address onBehalfOf, uint16) external {
        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        supplied[onBehalfOf] += amount;
    }
    
    function withdraw(address asset, uint256 amount, address to) external returns (uint256) {
        require(supplied[msg.sender] >= amount, "Insufficient supply");
        supplied[msg.sender] -= amount;
        IERC20(asset).transfer(to, amount);
        return amount;
    }
}

// Mock aToken
contract MockAToken {
    MockAavePool public pool;
    
    constructor(address _pool) {
        pool = MockAavePool(_pool);
    }
    
    function balanceOf(address user) external view returns (uint256) {
        return pool.supplied(user);
    }
}

/**
 * @title GoodKarmaVaultUnitTest
 * @notice Unit tests for GoodKarmaVault that don't require forking
 * @dev Run with: forge test --match-contract GoodKarmaVaultUnitTest
 */
contract GoodKarmaVaultUnitTest is Test {
    GoodKarmaVault public vault;
    MockERC20 public usdc;
    MockAavePool public aavePool;
    MockAToken public aUsdc;
    
    address public owner;
    address public user1;
    address public recipient1;
    address public recipient2;
    
    function setUp() public {
        owner = address(this);
        user1 = makeAddr("user1");
        recipient1 = makeAddr("recipient1");
        recipient2 = makeAddr("recipient2");
        
        // Deploy mocks
        usdc = new MockERC20("USD Coin", "USDC");
        aavePool = new MockAavePool();
        aUsdc = new MockAToken(address(aavePool));
        
        // Deploy vault
        vault = new GoodKarmaVault(
            IERC20(address(usdc)),
            "Good Karma Vault USDC",
            "gkUSDC",
            address(aavePool),
            address(aUsdc)
        );
        
        // Mint tokens to user
        usdc.mint(user1, 10_000e6);
    }
    
    // ============ Deployment Tests ============
    
    function test_Deployment() public view {
        assertEq(vault.owner(), owner);
        assertEq(vault.name(), "Good Karma Vault USDC");
        assertEq(vault.symbol(), "gkUSDC");
        assertEq(address(vault.asset()), address(usdc));
    }
    
    function test_InitialProfiles() public view {
        (address[] memory envRecipients, uint256[] memory envPercentages) = vault.getAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT
        );
        
        assertEq(envRecipients.length, 2);
        assertEq(envPercentages.length, 2);
        assertEq(envPercentages[0] + envPercentages[1], 10000);
    }
    
    function test_InitialState() public view {
        assertEq(vault.totalAssets(), 0);
        assertEq(vault.totalYieldAllocated(), 0);
        assertFalse(vault.paused());
    }
    
    // ============ Configuration Tests ============
    
    function test_UpdateAllocationConfig() public {
        address[] memory recipients = new address[](2);
        recipients[0] = recipient1;
        recipients[1] = recipient2;
        
        uint256[] memory percentages = new uint256[](2);
        percentages[0] = 3000;
        percentages[1] = 7000;
        
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
        
        (address[] memory saved, uint256[] memory savedPct) = 
            vault.getAllocationConfig(GoodKarmaVault.Profile.ENVIRONMENT);
        
        assertEq(saved[0], recipient1);
        assertEq(saved[1], recipient2);
        assertEq(savedPct[0], 3000);
        assertEq(savedPct[1], 7000);
    }
    
    function test_RevertUpdateConfigInvalidSum() public {
        address[] memory recipients = new address[](2);
        recipients[0] = recipient1;
        recipients[1] = recipient2;
        
        uint256[] memory percentages = new uint256[](2);
        percentages[0] = 3000;
        percentages[1] = 6000;
        
        vm.expectRevert("Must sum to 100%");
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
    }
    
    function test_RevertUpdateConfigLengthMismatch() public {
        address[] memory recipients = new address[](1);
        recipients[0] = recipient1;
        
        uint256[] memory percentages = new uint256[](2);
        percentages[0] = 5000;
        percentages[1] = 5000;
        
        vm.expectRevert("Length mismatch");
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
    }
    
    function test_RevertUpdateConfigEmptyArrays() public {
        address[] memory recipients = new address[](0);
        uint256[] memory percentages = new uint256[](0);
        
        vm.expectRevert("Empty arrays");
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
    }
    
    function test_UpdateConfigEmitsEvent() public {
        address[] memory recipients = new address[](1);
        recipients[0] = recipient1;
        
        uint256[] memory percentages = new uint256[](1);
        percentages[0] = 10000;
        
        vm.expectEmit(true, false, false, false);
        emit GoodKarmaVault.AllocationConfigUpdated(GoodKarmaVault.Profile.ENVIRONMENT);
        
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
    }
    
    function test_OnlyOwnerCanUpdateConfig() public {
        address[] memory recipients = new address[](1);
        recipients[0] = recipient1;
        
        uint256[] memory percentages = new uint256[](1);
        percentages[0] = 10000;
        
        vm.prank(user1);
        vm.expectRevert("Ownable: caller is not the owner");
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
    }
    
    // ============ Pause Tests ============
    
    function test_Pause() public {
        vault.pause();
        assertTrue(vault.paused());
    }
    
    function test_Unpause() public {
        vault.pause();
        vault.unpause();
        assertFalse(vault.paused());
    }
    
    function test_OnlyOwnerCanPause() public {
        vm.prank(user1);
        vm.expectRevert("Ownable: caller is not the owner");
        vault.pause();
    }
    
    function test_OnlyOwnerCanUnpause() public {
        vault.pause();
        
        vm.prank(user1);
        vm.expectRevert("Ownable: caller is not the owner");
        vault.unpause();
    }
    
    // ============ View Function Tests ============
    
    function test_PreviewDeposit() public view {
        uint256 shares = vault.previewDeposit(1000e6);
        assertGt(shares, 0);
    }
    
    function test_PreviewMint() public view {
        uint256 assets = vault.previewMint(1000e18);
        assertGt(assets, 0);
    }
    
    function test_MaxDeposit() public view {
        uint256 maxDeposit = vault.maxDeposit(user1);
        assertGt(maxDeposit, 0);
    }
    
    function test_MaxMint() public view {
        uint256 maxMint = vault.maxMint(user1);
        assertGt(maxMint, 0);
    }
    
    function test_ConvertToShares() public view {
        uint256 shares = vault.convertToShares(1000e6);
        assertGt(shares, 0);
    }
    
    function test_GetUnrealizedYield_Empty() public view {
        uint256 yield = vault.getUnrealizedYield();
        assertEq(yield, 0);
    }
    
    function test_GetEstimatedAPY_Empty() public view {
        uint256 apy = vault.getEstimatedAPY();
        assertEq(apy, 0);
    }
    
    // ============ Deposit Tests ============
    
    function test_Deposit() public {
        vm.startPrank(user1);
        usdc.approve(address(vault), 1000e6);
        
        uint256 shares = vault.deposit(1000e6, user1);
        
        assertGt(shares, 0);
        assertEq(vault.balanceOf(user1), shares);
        assertEq(vault.totalAssets(), 1000e6);
        vm.stopPrank();
    }
    
    function test_DepositMintsCorrectShares() public {
        vm.startPrank(user1);
        usdc.approve(address(vault), 1000e6);
        
        uint256 expected = vault.previewDeposit(1000e6);
        uint256 actual = vault.deposit(1000e6, user1);
        
        assertEq(actual, expected);
        vm.stopPrank();
    }
    
    function test_RevertDepositWhenPaused() public {
        vault.pause();
        
        vm.startPrank(user1);
        usdc.approve(address(vault), 1000e6);
        
        vm.expectRevert("Pausable: paused");
        vault.deposit(1000e6, user1);
        vm.stopPrank();
    }
    
    function testFuzz_Deposit(uint256 amount) public {
        amount = bound(amount, 1e6, 10_000e6);
        
        vm.startPrank(user1);
        usdc.approve(address(vault), amount);
        
        uint256 shares = vault.deposit(amount, user1);
        assertGt(shares, 0);
        assertEq(vault.totalAssets(), amount);
        vm.stopPrank();
    }
    
    // ============ Withdrawal Tests ============
    
    function test_Withdraw() public {
        // Deposit first
        vm.startPrank(user1);
        usdc.approve(address(vault), 1000e6);
        vault.deposit(1000e6, user1);
        
        uint256 balanceBefore = usdc.balanceOf(user1);
        vault.withdraw(500e6, user1, user1);
        uint256 balanceAfter = usdc.balanceOf(user1);
        
        assertEq(balanceAfter - balanceBefore, 500e6);
        vm.stopPrank();
    }
    
    function test_WithdrawBurnsShares() public {
        vm.startPrank(user1);
        usdc.approve(address(vault), 1000e6);
        vault.deposit(1000e6, user1);
        
        uint256 sharesBefore = vault.balanceOf(user1);
        vault.withdraw(500e6, user1, user1);
        uint256 sharesAfter = vault.balanceOf(user1);
        
        assertLt(sharesAfter, sharesBefore);
        vm.stopPrank();
    }
    
    function test_Redeem() public {
        vm.startPrank(user1);
        usdc.approve(address(vault), 1000e6);
        uint256 shares = vault.deposit(1000e6, user1);
        
        uint256 balanceBefore = usdc.balanceOf(user1);
        uint256 assets = vault.redeem(shares / 2, user1, user1);
        uint256 balanceAfter = usdc.balanceOf(user1);
        
        assertGt(assets, 0);
        assertEq(balanceAfter - balanceBefore, assets);
        vm.stopPrank();
    }
    
    function test_RevertWithdrawWhenPaused() public {
        vm.startPrank(user1);
        usdc.approve(address(vault), 1000e6);
        vault.deposit(1000e6, user1);
        vm.stopPrank();
        
        vault.pause();
        
        vm.prank(user1);
        vm.expectRevert("Pausable: paused");
        vault.withdraw(500e6, user1, user1);
    }
}