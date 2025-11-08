// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Aave V3 interfaces
interface IPool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
}

interface IAToken {
    function balanceOf(address user) external view returns (uint256);
}

/**
 * @title GoodKarmaVault
 * @notice ERC-4626 compliant vault that generates yield via Aave V3 and allocates it to public goods
 * @dev Implements three allocation profiles for different public goods categories
 */
contract GoodKarmaVault is ERC4626, Ownable, Pausable, ReentrancyGuard {
    
    // ============ State Variables ============
    
    IPool public immutable aavePool;
    IAToken public immutable aToken;
    
    // Allocation profiles
    enum Profile { ENVIRONMENT, DEVTOOLS, EDUCATION }
    
    struct AllocationConfig {
        address[] recipients;
        uint256[] percentages; // in basis points (10000 = 100%)
    }
    
    // Changed from public to private to avoid "internal type" error
    mapping(Profile => AllocationConfig) private allocationConfigs;
    
    // Tracking
    uint256 public totalYieldAllocated;
    uint256 public lastHarvestTimestamp;
    
    // ============ Events ============
    
    event YieldHarvested(uint256 amount, uint256 timestamp);
    event YieldAllocated(Profile indexed profile, address indexed recipient, uint256 amount);
    event AllocationConfigUpdated(Profile indexed profile);
    event EmergencyWithdraw(address indexed token, uint256 amount);
    
    // ============ Constructor ============
    
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _aavePool,
        address _aToken
    ) 
        ERC4626(_asset)
        ERC20(_name, _symbol)
    {
        aavePool = IPool(_aavePool);
        aToken = IAToken(_aToken);
        
        // Initialize default allocation profiles
        _initializeProfiles();
        
        lastHarvestTimestamp = block.timestamp;
    }
    
    // ============ Core Vault Functions ============
    
    /**
     * @notice Deposit assets and receive vault shares
     * @dev Overrides ERC4626 to add pause and reentrancy protection
     */
    function deposit(uint256 assets, address receiver) 
        public 
        virtual 
        override 
        whenNotPaused 
        nonReentrant 
        returns (uint256 shares) 
    {
        shares = super.deposit(assets, receiver);
        
        // Supply to Aave for yield generation
        _supplyToAave(assets);
    }
    
    /**
     * @notice Withdraw assets by burning vault shares
     * @dev Overrides ERC4626 to handle Aave withdrawal
     */
    function withdraw(uint256 assets, address receiver, address owner)
        public
        virtual
        override
        whenNotPaused
        nonReentrant
        returns (uint256 shares)
    {
        // Withdraw from Aave first
        _withdrawFromAave(assets);
        
        shares = super.withdraw(assets, receiver, owner);
    }
    
    /**
     * @notice Redeem vault shares for underlying assets
     */
    function redeem(uint256 shares, address receiver, address owner)
        public
        virtual
        override
        whenNotPaused
        nonReentrant
        returns (uint256 assets)
    {
        assets = previewRedeem(shares);
        
        // Withdraw from Aave first
        _withdrawFromAave(assets);
        
        return super.redeem(shares, receiver, owner);
    }
    
    // ============ Yield Management ============
    
    /**
     * @notice Harvest accrued yield from Aave and allocate to public goods
     * @param profile The allocation profile to use for distribution
     */
    function harvestYield(Profile profile) external onlyOwner {
        uint256 currentATokenBalance = aToken.balanceOf(address(this));
        uint256 vaultTotalAssets = totalAssets(); // Renamed to avoid shadowing
        
        // Calculate realized yield (aToken balance minus total deposited)
        if (currentATokenBalance <= vaultTotalAssets) {
            revert("No yield to harvest");
        }
        
        uint256 yieldAmount = currentATokenBalance - vaultTotalAssets;
        
        // Withdraw yield from Aave
        aavePool.withdraw(address(asset()), yieldAmount, address(this));
        
        // Allocate to recipients based on profile
        _allocateYield(profile, yieldAmount);
        
        totalYieldAllocated += yieldAmount;
        lastHarvestTimestamp = block.timestamp;
        
        emit YieldHarvested(yieldAmount, block.timestamp);
    }
    
    /**
     * @notice Get current unrealized yield in the vault
     */
    function getUnrealizedYield() public view returns (uint256) {
        uint256 currentATokenBalance = aToken.balanceOf(address(this));
        uint256 vaultTotalAssets = totalAssets(); // Renamed to avoid shadowing
        
        if (currentATokenBalance > vaultTotalAssets) {
            return currentATokenBalance - vaultTotalAssets;
        }
        return 0;
    }
    
    /**
     * @notice Calculate estimated APY based on recent yield
     * @dev This is a simplified calculation for demo purposes
     */
    function getEstimatedAPY() public view returns (uint256) {
        uint256 vaultTotalAssets = totalAssets(); // Renamed to avoid shadowing
        
        if (vaultTotalAssets == 0 || block.timestamp == lastHarvestTimestamp) {
            return 0;
        }
        
        uint256 unrealizedYield = getUnrealizedYield();
        uint256 timePassed = block.timestamp - lastHarvestTimestamp;
        
        // Annualized return = (yield / assets) * (365 days / time passed) * 100
        uint256 apy = (unrealizedYield * 365 days * 10000) / (vaultTotalAssets * timePassed);
        
        return apy; // Returns basis points (e.g., 500 = 5%)
    }
    
    // ============ Internal Functions ============
    
    function _supplyToAave(uint256 amount) internal {
        // Approve Aave pool
        IERC20(asset()).approve(address(aavePool), amount);
        
        // Supply to Aave
        aavePool.supply(address(asset()), amount, address(this), 0);
    }
    
    function _withdrawFromAave(uint256 amount) internal {
        aavePool.withdraw(address(asset()), amount, address(this));
    }
    
    function _allocateYield(Profile profile, uint256 totalAmount) internal {
        AllocationConfig storage config = allocationConfigs[profile];
        
        require(config.recipients.length > 0, "Profile not configured");
        require(config.recipients.length == config.percentages.length, "Config mismatch");
        
        for (uint256 i = 0; i < config.recipients.length; i++) {
            uint256 allocation = (totalAmount * config.percentages[i]) / 10000;
            
            if (allocation > 0) {
                IERC20(asset()).transfer(config.recipients[i], allocation);
                emit YieldAllocated(profile, config.recipients[i], allocation);
            }
        }
    }
    
    function _initializeProfiles() internal {
        // ENVIRONMENT Profile: 40% climate initiatives, 60% conservation
        address[] memory envRecipients = new address[](2);
        uint256[] memory envPercentages = new uint256[](2);
        envRecipients[0] = address(0x1111111111111111111111111111111111111111); // Climate project placeholder
        envRecipients[1] = address(0x2222222222222222222222222222222222222222); // Conservation placeholder
        envPercentages[0] = 4000; // 40%
        envPercentages[1] = 6000; // 60%
        
        allocationConfigs[Profile.ENVIRONMENT] = AllocationConfig(envRecipients, envPercentages);
        
        // DEVTOOLS Profile: 50% infrastructure, 50% education
        address[] memory devRecipients = new address[](2);
        uint256[] memory devPercentages = new uint256[](2);
        devRecipients[0] = address(0x3333333333333333333333333333333333333333); // Dev infra placeholder
        devRecipients[1] = address(0x4444444444444444444444444444444444444444); // Dev education placeholder
        devPercentages[0] = 5000; // 50%
        devPercentages[1] = 5000; // 50%
        
        allocationConfigs[Profile.DEVTOOLS] = AllocationConfig(devRecipients, devPercentages);
        
        // EDUCATION Profile: 70% learning platforms, 30% research
        address[] memory eduRecipients = new address[](2);
        uint256[] memory eduPercentages = new uint256[](2);
        eduRecipients[0] = address(0x5555555555555555555555555555555555555555); // Learning placeholder
        eduRecipients[1] = address(0x6666666666666666666666666666666666666666); // Research placeholder
        eduPercentages[0] = 7000; // 70%
        eduPercentages[1] = 3000; // 30%
        
        allocationConfigs[Profile.EDUCATION] = AllocationConfig(eduRecipients, eduPercentages);
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update allocation configuration for a profile
     * @param profile The profile to update
     * @param recipients Array of recipient addresses
     * @param percentages Array of allocation percentages (must sum to 10000)
     */
    function updateAllocationConfig(
        Profile profile,
        address[] calldata recipients,
        uint256[] calldata percentages
    ) external onlyOwner {
        require(recipients.length == percentages.length, "Length mismatch");
        require(recipients.length > 0, "Empty arrays");
        
        uint256 totalPercentage;
        for (uint256 i = 0; i < percentages.length; i++) {
            totalPercentage += percentages[i];
        }
        require(totalPercentage == 10000, "Must sum to 100%");
        
        allocationConfigs[profile] = AllocationConfig(recipients, percentages);
        
        emit AllocationConfigUpdated(profile);
    }
    
    /**
     * @notice Pause deposits and withdrawals
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause deposits and withdrawals
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Emergency withdraw all funds from Aave
     */
    function emergencyWithdrawFromAave() external onlyOwner {
        uint256 balance = aToken.balanceOf(address(this));
        aavePool.withdraw(address(asset()), balance, address(this));
        
        emit EmergencyWithdraw(address(asset()), balance);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get total assets including yield in Aave
     */
    function totalAssets() public view virtual override returns (uint256) {
        return aToken.balanceOf(address(this));
    }
    
    /**
     * @notice Get allocation configuration for a profile
     */
    function getAllocationConfig(Profile profile) 
        external 
        view 
        returns (address[] memory recipients, uint256[] memory percentages) 
    {
        AllocationConfig storage config = allocationConfigs[profile];
        return (config.recipients, config.percentages);
    }
}