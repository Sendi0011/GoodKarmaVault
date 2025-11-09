// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/GoodKarmaVault.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DeployGoodKarmaVault is Script {
    // Base Sepolia Aave V3 addresses
    address constant AAVE_POOL = 0x07eA79F68B2B3df564D0A34F8e19D9B1e339814b;
    
    // Base Sepolia test token addresses
    address constant USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e; // Base Sepolia USDC
    address constant AUSDC = 0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB; // Base Sepolia aUSDC
    
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        GoodKarmaVault vault = new GoodKarmaVault(
            IERC20(USDC),
            "Good Karma Vault USDC",
            "gkUSDC",
            AAVE_POOL,
            AUSDC
        );
        
        console.log("GoodKarmaVault deployed to:", address(vault));
        console.log("Owner:", vault.owner());
        console.log("Asset:", address(vault.asset()));
        console.log("Aave Pool:", address(vault.aavePool()));
        console.log("aToken:", address(vault.aToken()));
        
        vm.stopBroadcast();
    }
}