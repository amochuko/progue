import { formatDistanceToNow, parseISO } from 'date-fns';
import { User, getAllUsers } from '../../pages/users/user-slice';
import { useAppSelector } from '../../redux-store/config-store';
import { getAllNotifications } from './notification-slice';

export default function Notifications() {
  const notifications = useAppSelector(getAllNotifications);
  const users = useAppSelector(getAllUsers);

  const renderedNotifications = notifications.map((n: any) => {
    const date = parseISO(n.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((usr: User) => usr.id === n.user) || {
      name: 'Unknown Author',
    };

    return (
      <div key={n.id}>
        <div>
          <b>{user.name}</b> {n.message}
        </div>
        <div title={n.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
}
