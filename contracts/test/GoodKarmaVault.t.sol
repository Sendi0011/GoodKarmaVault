// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/GoodKarmaVault.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title GoodKarmaVaultSepoliaTest
 * @notice Tests for GoodKarmaVault on Base Sepolia testnet
 * @dev Run with: forge test --match-contract GoodKarmaVaultSepoliaTest --fork-url $BASE_SEPOLIA_RPC_URL
 */
contract GoodKarmaVaultSepoliaTest is Test {
    GoodKarmaVault public vault;
    IERC20 public usdc;
    IPool public aavePool;
    IAToken public aUsdc;
    
    address public owner;
    address public user1;
    address public user2;
    address public recipient1;
    address public recipient2;
    
    // Base Sepolia addresses
    address constant USDC_ADDRESS = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
    address constant AAVE_POOL_ADDRESS = 0x07eA79F68B2B3df564D0A34F8e19D9B1e339814b;
    address constant AUSDC_ADDRESS = 0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB;
    
    uint256 constant DEPOSIT_AMOUNT = 1000e6; // 1000 USDC
    
    function setUp() public {
        // This will only work when forking Base Sepolia
        // Run with: forge test --match-contract GoodKarmaVaultSepoliaTest --fork-url $BASE_SEPOLIA_RPC_URL
        
        owner = address(this);
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        recipient1 = makeAddr("recipient1");
        recipient2 = makeAddr("recipient2");
        
        // Get contract instances
        usdc = IERC20(USDC_ADDRESS);
        aavePool = IPool(AAVE_POOL_ADDRESS);
        aUsdc = IAToken(AUSDC_ADDRESS);
        
        // Deploy vault
        vault = new GoodKarmaVault(
            usdc,
            "Good Karma Vault USDC",
            "gkUSDC",
            AAVE_POOL_ADDRESS,
            AUSDC_ADDRESS
        );
    }
    
    // ============ Deployment Tests ============
    
    function test_Deployment() public view {
        assertEq(vault.owner(), owner);
        assertEq(vault.name(), "Good Karma Vault USDC");
        assertEq(vault.symbol(), "gkUSDC");
        assertEq(address(vault.asset()), USDC_ADDRESS);
    }
    
    function test_InitialProfiles() public view {
        (address[] memory envRecipients, uint256[] memory envPercentages) = vault.getAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT
        );
        
        assertEq(envRecipients.length, 2);
        assertEq(envPercentages.length, 2);
        assertEq(envPercentages[0] + envPercentages[1], 10000);
    }
    
    // ============ Configuration Tests ============
    
    function test_UpdateAllocationConfig() public {
        address[] memory recipients = new address[](2);
        recipients[0] = recipient1;
        recipients[1] = recipient2;
        
        uint256[] memory percentages = new uint256[](2);
        percentages[0] = 3000; // 30%
        percentages[1] = 7000; // 70%
        
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
        
        (address[] memory savedRecipients, uint256[] memory savedPercentages) = 
            vault.getAllocationConfig(GoodKarmaVault.Profile.ENVIRONMENT);
        
        assertEq(savedRecipients[0], recipient1);
        assertEq(savedRecipients[1], recipient2);
        assertEq(savedPercentages[0], 3000);
        assertEq(savedPercentages[1], 7000);
    }
    
    function test_RevertUpdateConfigInvalidSum() public {
        address[] memory recipients = new address[](2);
        recipients[0] = recipient1;
        recipients[1] = recipient2;
        
        uint256[] memory percentages = new uint256[](2);
        percentages[0] = 3000;
        percentages[1] = 6000; // Only 90%
        
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
    
    // ============ Admin Function Tests ============
    
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
    
    // ============ View Function Tests ============
    
    function test_PreviewDeposit() public view {
        uint256 shares = vault.previewDeposit(DEPOSIT_AMOUNT);
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
        uint256 shares = vault.convertToShares(DEPOSIT_AMOUNT);
        assertGt(shares, 0);
    }
    
    function test_TotalAssets() public view {
        // Should be 0 initially since no deposits
        uint256 assets = vault.totalAssets();
        assertEq(assets, 0);
    }
    
    function test_GetUnrealizedYield() public view {
        // Should be 0 initially since no deposits
        uint256 yield = vault.getUnrealizedYield();
        assertEq(yield, 0);
    }
    
    function test_GetEstimatedAPY() public view {
        // Should be 0 initially since no deposits
        uint256 apy = vault.getEstimatedAPY();
        assertEq(apy, 0);
    }
}