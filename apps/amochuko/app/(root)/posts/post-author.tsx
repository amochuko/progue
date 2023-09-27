import { useAppSelector } from '../../redux-store/config-store';
import { User } from '../users/user-slice';

type PostAuthorProps = {
  userId?: string;
};
export function PostAuthor(props: PostAuthorProps) {
  const author = useAppSelector((state) =>
    state.users?.find((usr: User) => usr.id === props.userId)
  );

  return (
    <p>
      by: 
      <span style={{ fontWeight: 'bold', paddingLeft: '8px' }}>
        {author ? author.name : 'Unknown Author'}
      </span>
    </p>
  );
}
