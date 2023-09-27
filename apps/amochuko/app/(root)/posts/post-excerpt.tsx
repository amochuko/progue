import { Link } from 'react-router-dom';
import { TimeAgo } from '../../components/time-ago/time-ago';
import { PostAuthor } from './post-author';
import { Post } from './post-slice';
import { ReactionButton } from './reaction-button/reaction-btn';

interface Props {
  post: Post;
}

export const PostExcerpt = ({ post }: Props) => {
  return (
    <article className='post-excerpt'>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.author} />
        {post.date && <TimeAgo timestamp={post.date.toString()} />}
      </div>
      <p>{post.body.substring(0, 100)}</p>
      <ReactionButton post={post} />
      <Link
        to={`/posts/${post.id}`}
        style={{ border: '2px solid gray', padding: '2px' }}
      >
        Read more
      </Link>
    </article>
  );
};
