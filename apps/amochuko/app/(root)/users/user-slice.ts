import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../mocks/http';
import { RootState } from '../../redux-store/config-store';

export type User = { id: string; name: string; username: string };

type UserState = User[];

const initialState: UserState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const res = await http.get({
      url: 'https://jsonplaceholder.typicode.com/users',
    });
    return res.data;
  } catch (err) {
    throw Error('No users found!');
  }
});

export const getAllUsers = (state: RootState) => state.users;
export const getUserById = (state: RootState, userId: string) => {
  return state.users.find((usr: User) => usr.id === userId);
};

export const userReducer = userSlice.reducer;
