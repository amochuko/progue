import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { http } from '../../mocks/http';
import { AppDispatch, RootState } from '../../redux-store';

export type Post = {
  id: string;
  title: string;
  body: string;
  author?: string;
  date: string | undefined;
  reactions?: Record<string, number>;
};

export interface PostState {
  posts: Post[];
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | undefined;
}

const initialState = {
  posts: [],
  status: 'idle',
  error: '',
} as PostState;

// used for Normalization of data - create a map of data for easy retrieval

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: (state, action: PayloadAction<Post>) => {
    //   state.posts.push(action.payload);
    // },
    postUpdated: (state, action: PayloadAction<Post>) => {
      const { id, title, body } = action.payload;
      const existPost = state.posts.find((p) => p.id === id);

      if (existPost) {
        existPost.title = title;
        existPost.body = body;
      }
    },
    reactionAdded(state, action: PayloadAction<Post>) {
      const { id, title } = action.payload;

      const existingPost = state.posts.find((p) => p.id === id);
      if (existingPost && existingPost?.reactions) {
        existingPost.reactions[title]++;
      }
    },
    changes: {
      reducer: () => {},
      prepare: (title: string, content: string, userId: string) => {
        // usage: for static additional update of payload if needed
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    // Respond to other actions that are not explicitly defined up in the `reducer`
    // but exist outside of the slice
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'fulfilled';

        // parse the data
        action.payload.map((p: Post) => {
          p.date = new Date().toISOString();
          return p;
        });

        // add post to state
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPostsById.fulfilled, (state, action) => {
        // TODO: fill state with action.payload
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Add the new post object to posts array
        state.posts.push(action.payload);
      });
  },
});

export const postsActions = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

export const getAllPosts = (state: RootState) => state.posts;
export const getPostById = (state: RootState, postId: string) => {
  return state.posts.posts.find((p) => p.id === postId);
};

/**
 * @dev use `createSelector` over `useSelector
 * for the benefit of memoization of fectched data against re-render
 * of components side effect
 */
export const getPostsByUser = createSelector(
  [getAllPosts, (state, userId: string) => userId],
  (state, userId) => state.posts.filter((p) => p.author === userId)
);

const url = 'https://jsonplaceholder.typicode.com/posts';

// using thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const res = await http.get({
      url,
    });

    return res.data;
  } catch (err) {
    throw Error('No data found!');
  }
});

export const addNewPost = createAsyncThunk<Post, any>(
  '/post/addNewPost',
  async (postData:Post) => {
    try {
      const res = await http.post({ url, opts: postData });
      return (await res.data.json()) as Post;
    } catch (err) {
      throw Error('No post found!');
    }
  }
);

export const addNewPostAsync = (body: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await http.post({
      url,
      opts: body,
    });

    return res.data;
  } catch (err) {
    throw new Error('err.message');
  }
};

export const fetchPostsById = createAsyncThunk<
  Post,
  string,
  { extra: { serviceApi: Promise<any> } }
>(
  '/post/fetchById',
  async (postId, thunkApi) => {
    // call thunk.extra.serviceApi

    const res = await await http.get({
      url,
      opts: postId,
    });

    // TODO: Normalize returned data to update stroe
    // TODO: try to Normalized store as {ids:[],entities:{}}
    //  TODO: try out normalizr js
    //
    // or use import {  createEntityAdapter} from '@reduxjs/toolkit'

    return res.data as Post;
  }

  // Later, dispatch the thunk as needed in the app
  // dispatch(fetchUserById(123))
);
