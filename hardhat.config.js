require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/6mDfhg_8QQrXAGJp9ZRrbo5BChb80R9r",
      accounts: [
        "0xbf29e9a903ae374fb0eb3fb289bbb2aa4858cd143e5d5870f8ae828a43c16759",
      ],
    },
  },
};
