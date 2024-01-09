import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { assert } from 'chai';
import hre from 'hardhat';

describe('Game2', function () {
  async function deployContractAndSetVariables() {
    const Game = await hre.ethers.getContractFactory('Game2');
    const game = await Game.deploy();

    return { game };
  }

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // press all the right switches to win this stage
    await game.switchOn(20);
    await game.switchOn(47);
    await game.switchOn(212);

    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
