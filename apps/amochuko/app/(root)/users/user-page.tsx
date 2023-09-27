import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux-store/config-store';
import { Post, getAllPosts } from '../posts/post-slice';
import { getUserById } from './user-slice';

export const UserPage = () => {
  const { userId } = useParams();

  let user = useAppSelector((state) => getUserById(state, String(userId)));

  const userPosts = useAppSelector((state) => {
    return getAllPosts(state).posts.filter(
      (post: Post) => post.author === userId
    );
  });

  const postTitles = userPosts.map((p: Post) => (
    <li key={p.id}>
      <Link to={`/posts/${p.id}`}>{p.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
};
