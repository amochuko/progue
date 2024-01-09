import 'dotenv/config';
import hre, { ethers } from 'hardhat';
import {
  DEPLOYER_PRIVATE_KEY,
  getArtifacts,
  getProvider,
  getWallet,
} from '../utils/config';
import { verifyContract } from './helpers';

async function main() {
  const provider = getProvider(hre);

  const wallet = await getWallet({
    hre,
    provider,
    deployerPrivateKey: String(DEPLOYER_PRIVATE_KEY),
  });

  // ContractToByPass
  //   const contractToByPass = await getArtifacts({
  //     hre,
  //     contractName: 'ContractToByPass',
  //   });

  //   const ContractToByPass = new ethers.ContractFactory(
  //     contractToByPass.abi,
  //     contractToByPass.bytecode,
  //     wallet
  //   );

  //   const contractByPass = await ContractToByPass.deploy();
  //   const contractByPassAddress = await contractByPass.getAddress();
  //   console.log('ContractToByPass address: ', contractByPassAddress);
  //   //   listen to event

  //   contractByPass.on('Winner', (data) => {
  //     console.log(data);
  //   });

  //   const tx = await contractByPass.waitForDeployment();
  //   console.log(tx);

  // time.increase(1200);

  // ByPasser
  const byPasserArtifacts = await getArtifacts({
    hre,
    contractName: 'ByPasser',
  });

  //   ByPass Contract instance
  const ByPass = new ethers.ContractFactory(
    byPasserArtifacts.abi,
    byPasserArtifacts.bytecode,
    wallet
  );

//   const bypasser = await ByPass.deploy();
//   const bypasserAddress = await bypasser.getAddress();
//   await bypasser.waitForDeployment();

//   console.log('bypasser address: ', bypasserAddress);

  await verifyContract({
    hre,
    contractAddress: '0x0CcFdF6572122ae123af9Fb5C9902a824Af40b91',
    constructorArgs: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
