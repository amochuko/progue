import 'dotenv/config';
import { ethers } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

///////////////////////////////////////////////////
///// This file contains app wild config data  //////
//////////////////////////////////////////////////

const {
  NEXT_TESTNET_PRIVATE_KEY,
  NEXT_LOCALNET_PRIVATE_KEY,
  NEXT_MAINNET_PRIVATE_KEY,
  NEXT_GOERLI_RPC_URL,
  NEXT_MUMBAI_RPC_URL,
  NEXT_POLYGON_RPC_URL,
  NEXT_MAINNET_RPC_URL,
  NEXT_ETHERSCAN_API_KEY,
} = process.env;

// The privateKey for Wallet setup
const DEPLOYER_PRIVATE_KEY =
  process.env.NODE_ENV === 'development'
    ? NEXT_TESTNET_PRIVATE_KEY
    : NEXT_LOCALNET_PRIVATE_KEY;

// AI
const OPENAI = { API_KEY: process.env.OPENAI_API_KEY };
const PINECONE = {
  API_KEY: process.env.PINECONE_API_KEY,
  INDEX_NAME: process.env.PINECONE_INDEX_NAME,
  ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
};

/**
 * Funtion to initiate the JsonRpcProvider
 * @param hre {HardhatRuntimeEnvironment} Hardhat Runtime Env
 * @returns provider {ethers.JsonRpcProvider}
 */
const getProvider = (hre: HardhatRuntimeEnvironment) => {
  // Ethers provider
  let provider: ethers.JsonRpcProvider;

  if (hre.network.name === 'hardhat') {
    provider = new ethers.JsonRpcProvider();
  } else if (hre.network.name === 'mumbai') {
    provider = new ethers.JsonRpcProvider(NEXT_MUMBAI_RPC_URL);
  } else if (hre.network.name === 'goerli') {
    provider = new ethers.JsonRpcProvider(NEXT_GOERLI_RPC_URL);
  } else if (hre.network.name === 'polygon') {
    provider = new ethers.JsonRpcProvider(NEXT_POLYGON_RPC_URL);
  } else {
    provider = new ethers.JsonRpcProvider(NEXT_MAINNET_RPC_URL);
  }
  return provider;
};

type ArtifactArgsType = {
  hre: HardhatRuntimeEnvironment;
  contractName: string;
};

/**
 * Function to get a Contract's artifacts
 * @param hre  {HardhatRuntimeEnvironment} Hardhat Runtime Env
 * @param contractName The name of contract
 * returns Promise{Artifact}
 */
const getArtifacts = async ({ hre, contractName }: ArtifactArgsType) => {
  return await hre.artifacts.readArtifact(contractName);
};

type WalletArgsType = {
  hre: HardhatRuntimeEnvironment;
  provider: ethers.JsonRpcProvider;
  deployerPrivateKey: string;
};
/**
 * Function to init Wallet
 * @param hre {HardhatRuntimeEnvironment} Hardhat Runtime Env
 * @param provider {ethers.JsonRpcProvider} JsonRpcProvider
 * @param deployerPrivateKey {string} The private key of the deployer
 * @returns Promise{ethers.Wallet}
 */
const getWallet = async ({
  hre: HardhatRuntimeEnvironment,
  provider,
  deployerPrivateKey,
}: WalletArgsType) => {
  return new ethers.Wallet(deployerPrivateKey, provider);
};

export {
  DEPLOYER_PRIVATE_KEY,
  NEXT_ETHERSCAN_API_KEY,
  NEXT_GOERLI_RPC_URL,
  NEXT_MUMBAI_RPC_URL,
  OPENAI,
  PINECONE,
  getArtifacts,
  getProvider,
  getWallet,
};
