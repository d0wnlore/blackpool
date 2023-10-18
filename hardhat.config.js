require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [process.env.PRIVATE_KEY]
    },
    mantleTest: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: [process.env.ETHERSCAN_API_KEY],
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
      {
        network: "mantleTest",
        chainId: 5001,
        urls: {
        apiURL: "https://explorer.testnet.mantle.xyz/api",
        browserURL: "https://explorer.testnet.mantle.xyz"
        }
      }
    ],
  },
};