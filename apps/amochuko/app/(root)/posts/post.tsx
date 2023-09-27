import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux-store/config-store';
import { PostAuthor } from './post-author';
import { getPostById } from './post-slice';
import { ReactionButton } from './reaction-button/reaction-btn';

export function Post() {
  let params = useParams();

  const post = useAppSelector((state) => {
    return params.postId && getPostById(state, params.postId);
  });

  if (!post) {
    return (
      <section>
        <article>
          <h2>404! Error</h2>
          <p>Post not found!</p>
        </article>
      </section>
    );
  }

  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p className='post-content'>{post.body}</p>
        <PostAuthor userId={post.id} />
        <p>
          <Link to={`edit`}>Edit Post</Link>
        </p>
        <ReactionButton post={post} />
      </article>
    </section>
  );
}
