import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import {
  DEPLOYER_PRIVATE_KEY,
  NEXT_ETHERSCAN_API_KEY,
  NEXT_GOERLI_RPC_URL,
  NEXT_MUMBAI_RPC_URL,
} from './utils/config';

const { HardhatUserConfig } = require('hardhat/config');

const config: typeof HardhatUserConfig = {
  defaultNetwork: 'localhost',
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: NEXT_MUMBAI_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    polygon: {
      url: 'https://polygon-rpc.com/',
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    goerli: {
      url: NEXT_GOERLI_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: NEXT_ETHERSCAN_API_KEY,
  },
};

module.exports = config;
