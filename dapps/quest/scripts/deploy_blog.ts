const hre = require('hardhat');
import fs from 'fs';

async function main() {
  const Blog = await hre.ethers.getContractFactory('Blog');
  const blog = await Blog.deploy('My blog');

  await blog.waitForDeployment();

  // Write details to blogContract.ts file
  fs.writeFileSync(
    process.cwd() + '/utils/blogContract.ts',
    `
  export const contractAddress = '${await blog.getAddress()}'
  export const ownerAddress = '${blog.runner.address}'
  `,
    { encoding: 'utf-8' }
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
