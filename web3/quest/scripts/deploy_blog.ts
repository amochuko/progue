const hre = require('hardhat');

async function main() {
  const Blog = await hre.ethers.getContractFactory('Blog');
  const blog = await Blog.deploy('My blog');

  await blog.waitForDeployment();


  //TODO: Write details to config.ts file

  console.log('Blog deployed to: ', await blog.getAddress());
  console.log('Deployer address: ', blog.runner.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
