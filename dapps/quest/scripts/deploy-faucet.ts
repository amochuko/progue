import 'dotenv/config';
import { ethers } from 'ethers';
import hre from 'hardhat';
import { DEPLOYER_PRIVATE_KEY, getProvider } from '../utils/config';

async function main() {
  const provider = getProvider(hre);
  const artifacts = await hre.artifacts.readArtifact('Faucet');
  const wallet = new ethers.Wallet(String(DEPLOYER_PRIVATE_KEY), provider);

  console.log('wallet.address: ', wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log('wallet.balance: ', balance.toString());

  // Contract instance
  const factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  const faucet = await factory.deploy();
  console.log('Faucet address: ', await faucet.getAddress());
 const tx = await faucet.waitForDeployment();
 console.log(tx)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
