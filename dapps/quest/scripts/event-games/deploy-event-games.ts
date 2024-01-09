import hre from 'hardhat';

// replace the name of the contract with which one you want to deploy!
const contractName = 'EventGame5';

let contractAddress = '';

async function main() {
  const Game = await hre.ethers.getContractFactory(contractName);

  // if you need to add constructor arguments for the particular game, add them here:
  const game = await Game.deploy();
  contractAddress = await game.getAddress();

  console.log(`${contractName} deployed to address: ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
