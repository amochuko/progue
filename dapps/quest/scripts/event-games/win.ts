import hre from 'hardhat';

// add the game address here and update the contract name if necessary
const gameAddr = '0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E';
const contractName = 'EventGame5';

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:

  await game.giveMeAllowance(15000);
  await game.mint(12000);
  
  const tx = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();

  console.log(receipt?.logs[0]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
