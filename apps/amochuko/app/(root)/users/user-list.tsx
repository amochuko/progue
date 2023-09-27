import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux-store/config-store';
import { getAllUsers, User } from './user-slice';

export const UserList = () => {
  const users = useAppSelector(getAllUsers);

  const renderedUsers = users.map((usr: User) => (
    <li key={usr.id}>
      <Link to={`/users/${usr.id}`}>{usr.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};
