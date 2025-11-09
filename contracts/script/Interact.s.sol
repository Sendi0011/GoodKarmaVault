// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/GoodKarmaVault.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Interact
 * @notice Script for interacting with deployed GoodKarmaVault
 */
contract Interact is Script {
    // Update this with your deployed vault address
    address constant VAULT_ADDRESS = address(0); // TODO: Update after deployment
    
    GoodKarmaVault vault = GoodKarmaVault(VAULT_ADDRESS);
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Choose which action to perform
        // Uncomment the function you want to execute
        
        // viewInfo();
        // approveAndDeposit(1000e6); // 1000 USDC
        // withdrawFunds(500e6); // 500 USDC
        // updateProfile();
        // harvestYield();
        
        vm.stopBroadcast();
    }
    
    // ============ View Functions ============
    
    function viewInfo() public view {
        console.log("=== Vault Information ===");
        console.log("Vault Address:", address(vault));
        console.log("Owner:", vault.owner());
        console.log("Total Assets:", vault.totalAssets());
        console.log("Unrealized Yield:", vault.getUnrealizedYield());
        console.log("Estimated APY (bps):", vault.getEstimatedAPY());
        console.log("Paused:", vault.paused());
    }
    
    // ============ Deposit Functions ============
    
    function approveAndDeposit(uint256 amount) public {
        IERC20 usdc = IERC20(vault.asset());
        
        console.log("Approving USDC...");
        usdc.approve(address(vault), amount);
        
        console.log("Depositing", amount, "USDC...");
        uint256 shares = vault.deposit(amount, msg.sender);
        
        console.log("Received", shares, "shares");
        console.log("Total Assets:", vault.totalAssets());
    }
    
    // ============ Withdrawal Functions ============
    
    function withdrawFunds(uint256 amount) public {
        console.log("Withdrawing", amount, "USDC...");
        uint256 shares = vault.withdraw(amount, msg.sender, msg.sender);
        
        console.log("Burned", shares, "shares");
        console.log("Remaining balance:", vault.balanceOf(msg.sender));
    }
    
    function redeemShares(uint256 shares) public {
        console.log("Redeeming", shares, "shares...");
        uint256 assets = vault.redeem(shares, msg.sender, msg.sender);
        
        console.log("Received", assets, "USDC");
    }
    
    // ============ Admin Functions ============
    
    function updateProfile() public {
        // Example: Update ENVIRONMENT profile
        address[] memory recipients = new address[](2);
        recipients[0] = 0x1234567890123456789012345678901234567890; // Replace with real address
        recipients[1] = 0x0987654321098765432109876543210987654321; // Replace with real address
        
        uint256[] memory percentages = new uint256[](2);
        percentages[0] = 4000; // 40%
        percentages[1] = 6000; // 60%
        
        console.log("Updating ENVIRONMENT profile...");
        vault.updateAllocationConfig(
            GoodKarmaVault.Profile.ENVIRONMENT,
            recipients,
            percentages
        );
        
        console.log("Profile updated successfully");
    }
    
    function harvestYield() public {
        uint256 unrealizedYield = vault.getUnrealizedYield();
        console.log("Unrealized yield:", unrealizedYield);
        
        if (unrealizedYield > 0) {
            console.log("Harvesting yield...");
            vault.harvestYield(GoodKarmaVault.Profile.ENVIRONMENT);
            console.log("Yield harvested successfully");
        } else {
            console.log("No yield to harvest");
        }
    }
    
    function pauseVault() public {
        console.log("Pausing vault...");
        vault.pause();
        console.log("Vault paused");
    }
    
    function unpauseVault() public {
        console.log("Unpausing vault...");
        vault.unpause();
        console.log("Vault unpaused");
    }
    
    function emergencyWithdraw() public {
        console.log("Emergency withdrawing from Aave...");
        vault.emergencyWithdrawFromAave();
        console.log("Emergency withdrawal complete");
    }
}