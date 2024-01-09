import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre, { ethers } from 'hardhat';

describe('ByPass Test', () => {
  async function deployFixture() {
    const [alice, bob] = await ethers.getSigners();

    const ByPasser = await hre.ethers.getContractFactory('ByPasser');
    const byPasser = await ByPasser.deploy();

    await byPasser.waitForDeployment();

    // Contract B
    const ContractToByPass =
      await hre.ethers.getContractFactory('ContractToByPass');
    const contractToByPass = await ContractToByPass.deploy();

    await contractToByPass.waitForDeployment();

    return { byPasser, contractToByPass, alice, bob };
  }

  it('calls another contract via address', async () => {
    const { byPasser, contractToByPass, bob, alice } =
      await loadFixture(deployFixture);

    let caller;
    contractToByPass.on(contractToByPass.filters.Winner, (address: any, e) => {
      caller = e.args[0];
    });

    const tx = await byPasser.win(await contractToByPass.getAddress());
    await tx.wait();

    const byPasserAddress = await byPasser.getAddress();
    expect(caller == byPasserAddress, 'Not caller address!');
  });
});
