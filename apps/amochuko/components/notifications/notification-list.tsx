import * as dfns from 'date-fns';
import { getAllUsers } from '../../pages/users/user-slice';
import { useAppSelector } from '../../redux-store';
import { getAllNotifications } from './notification-slice';

export function NotificationsList() {
  const notifications = useAppSelector(getAllNotifications);
  const users = useAppSelector(getAllUsers);

  const renderedNotifications = notifications.map((n) => {
    const date = dfns.parseISO(n.date);
    const timeAgo = dfns.formatDistanceToNow(date);
    const user = users.find((usr) => usr.id === n.user) || {
      name: 'Unknown User',
    };

    return (
      <div key={n.date} className='notification'>
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
    <section className='notifications-list'>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
}
