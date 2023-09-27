import { combineReducers } from '@reduxjs/toolkit';
import { notificationsReducer } from '../components/notifications/notification-slice';
import { portfolioReducer } from '../pages/portfolio/store/portfolio-slice';
import { postsReducer } from '../pages/posts/post-slice';
import { userReducer } from '../pages/users/user-slice';

/**
 * Create the root reducer independently to obtain the RootState type
 */
export const rootReducer = combineReducers({
  users: userReducer,
  posts: postsReducer,
  notification: notificationsReducer,
  portfolio: portfolioReducer,
  // TODO: check with RTQ for proper setup and  usage
  // [apiSlice.reducerPath]: apiSlice.reducer,
});
