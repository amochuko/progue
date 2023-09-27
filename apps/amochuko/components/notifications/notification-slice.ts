import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../mocks/http';
import { RootState } from '../../redux-store/config-store';

type Notifications = {
  [index: string]: string;
  date: string;
  user: string;
};

const initialState: Notifications[] = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.concat(...action.payload);
      state.sort((a: any, b: any) => b.date.localCompare(a.date));
    });
  },
});

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const [latestNotification] = getAllNotifications(getState() as RootState);
    const latestTimestamp = latestNotification ? latestNotification?.date : '';

    try {
      const res = await http.get({
        url: `/fakeApi/notifications?since=${latestTimestamp}`,
      });

      return res.data;
    } catch (err) {
      throw Error(String(err));
    }
  }
);

export const notificationsReducer = notificationsSlice.reducer;
export const getAllNotifications = (state: RootState) => state.notification;
