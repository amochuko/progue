require("@nomicfoundation/hardhat-toolbox");
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomicfoundation/hardhat-ethers');
const  { HardhatUserConfig,  } = require("hardhat/config");

const config: typeof HardhatUserConfig = {
  solidity: "0.8.19",
  networks:{
    hardhat:{
      chainId: 1337
    },
    // mumbai: {
    //   url: "https://rpc-mumbai.matic.today",
    //   accounts: [process.env.pk]
    // },
    // polygon: {
    //   url: "https://polygon-rpc.com/",
    //   accounts: [process.env.pk]
    // }
  }

};

module.exports =  config;
