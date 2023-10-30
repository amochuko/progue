import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
const hre = require('hardhat');

describe('Blog', () => {
  async function deployBlogFixture() {
    const Blog = await hre.ethers.getContractFactory('Blog');
    const blogName = 'Zerox Blog';
    const blog = await Blog.deploy(blogName);

    await blog.waitForDeployment();
    return { blog, title: 'Test 101 post', hash: 232323, blogName };
  }

  it('should create a post', async () => {
    const { blog, title, hash } = await loadFixture(deployBlogFixture);
    blog.createPost(title, hash);

    const posts = await blog.fetchPosts();
    expect(posts[0].title).to.equal(title);
  });

  it('should edit a post', async () => {
    const { blog, title, hash } = await loadFixture(deployBlogFixture);
    await blog.createPost(title, hash);

    const newTitle = 'Updated Post';
    await blog.updatePost(1, newTitle, '454545', true);

    const posts = await blog.fetchPosts();
    expect(posts[0].title).to.equal(newTitle);
  });

  it('should update name of blog', async () => {
    const { blog, title, blogName } = await loadFixture(deployBlogFixture);

    expect(await blog.name()).to.equal(blogName);
    
    const newName = 'Demo Blog';
    await blog.updateName(newName);
    expect(await blog.name()).to.equal(newName);
  });
});
