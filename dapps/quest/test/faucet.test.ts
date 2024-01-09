import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('Faucet', () => {
  async function deployContractAndSetVariables() {
    const withdrawAmount = hre.ethers.parseUnits('1', 'ether');

    const Faucet = await hre.ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy(
      253,
      '0x32466Aa64E0525E731b41b884DAB8fff3B9c5448'
    );

    const [owner] = await hre.ethers.getSigners();
    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, withdrawAmount };
  }
  it('should deploy and set owner correctly', async () => {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above .1 ETH as a time', async () => {
    const { faucet, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });
});
