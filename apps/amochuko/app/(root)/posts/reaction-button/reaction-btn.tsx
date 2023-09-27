import { useAppDispatch } from '../../../redux-store';
import { Post, postsActions } from '../post-slice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};
interface ReactionButtonProps {
  post: Post;
}
export function ReactionButton({ post }: ReactionButtonProps) {
  const dispatch = useAppDispatch();

  const rxnBtns = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        className='muted-button reaction-btn'
        onClick={() => dispatch(postsActions.reactionAdded(post))}
      >
        {emoji} {post.reactions && post.reactions[name]}
      </button>
    );
  });

  return <div>{rxnBtns}</div>;
}
