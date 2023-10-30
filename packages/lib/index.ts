export * as WalletConnectProvider from '@walletconnect/web3-provider';
export * as ethers from 'ethers';
import Web3Modal from 'web3modal';

export { Web3Modal };
export const axiosInstance = {};
export const PRIVATE_KEY = {
  LOCALNET: process.env.LOCALNET_WALLET_PRIVATE_KEY,
  TESTNET: process.env.TESTNET_DEV_WALLET_PRIVATE_KEY,
  MAINNET: process.env.MAINNET_DEV_WALLET_PRIVATE_KEY,
};
