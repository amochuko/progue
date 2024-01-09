import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { assert } from 'chai';
import hre from 'hardhat';

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const [alice, bob] = await hre.ethers.getSigners();

    const Game = await hre.ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game, alice, bob };
  }
  it('should be a winner', async function () {
    const { game, alice, bob } = await loadFixture(
      deployContractAndSetVariables
    );

    // nested mappings are rough :}
    await game.connect(bob).write(alice.address);
 
    // win game
    await game.win(bob.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
