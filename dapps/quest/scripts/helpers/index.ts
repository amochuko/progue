import { HardhatRuntimeEnvironment } from 'hardhat/types';

type VerifyContractArgs = {
  contractAddress: string;
  constructorArgs: any[];
  hre: HardhatRuntimeEnvironment;
};

/**
 *
 * @param  hre Hardhat Runtime Environment
 * @param  contractAddress The contract to verify
 * @param constructorArgs The constructor args required (if any) by the contract
 */
export async function verifyContract({
  contractAddress,
  constructorArgs,
  hre,
}: VerifyContractArgs) {
  await hre.run('verify:verify', {
    address: contractAddress,
    constructorArguments: [...constructorArgs],
  });
}
