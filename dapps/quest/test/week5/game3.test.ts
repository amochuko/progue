import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { assert } from 'chai';
import hre from 'hardhat';

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await hre.ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = await hre.ethers.provider.getSigner();

    const [user1, user2, user3] = await hre.ethers.getSigners();

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer, user1, user2, user3 };
  }

  it('should be a winner', async function () {
    const { game, signer, user1, user2, user3 } = await loadFixture(
      deployContractAndSetVariables
    );

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(user1).buy({ value: '4' });
    await game.connect(user2).buy({ value: '15' });
    await game.connect(user3).buy({ value: '2' });

    // TODO: win expects three arguments
    await game.win(user1, user2, user3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
