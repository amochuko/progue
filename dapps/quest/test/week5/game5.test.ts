import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { assert } from 'chai';
import hre, { ethers } from 'hardhat';

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await hre.ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const provider = hre.ethers.provider;

    return { game, provider };
  }
  it('should be a winner', async function () {
    const { game, provider } = await loadFixture(deployContractAndSetVariables);

    const threshold = '0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf';
    let wallet;
    let address = '0';

    while (ethers.formatUnits(threshold) > address.toString()) {
      wallet = hre.ethers.Wallet.createRandom(provider);
      await provider.send('hardhat_setBalance', [
        wallet.address,
        '0x56BC75E2D63100000',
      ]);

      game.connect(wallet);
      address = ethers.formatUnits(wallet.address);

      if (ethers.formatUnits(wallet.address) < ethers.formatUnits(threshold)) {
        // good luck
        game.win();

        return;
      }
    }

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
