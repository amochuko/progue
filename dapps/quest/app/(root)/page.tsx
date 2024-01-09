// import Blog from '../../artifacts/contracts/Blog.sol/Blog.json';
import type { Blog } from '../../typechain-types/Blog';
import PageClient from './PageClient';

type HomeProps = {
  posts: Blog.PostStruct[];
};
export default async function Home(props: HomeProps) {
  const data = await getData();

  return <PageClient data={data} />;
}

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  // .then((response) => response.json())
  // .then((json) => console.log(json));
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
