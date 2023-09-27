import { Post, postsActions, postsReducer, PostState } from '../../post-slice';

let post: Post;

beforeEach(() => {
  post = {
    id: 'string',
    title: 'string',
    body: 'string',
    author: 'string',
    date: 'string',
  };
});

describe('Post unitTest', () => {
  it('should return initial state', () => {
    expect(postsReducer(undefined, { type: undefined })).toEqual([]);
  });

  it('should handle a post being added to an empty list', () => {
    const prevState: PostState = {
      posts: [],
      error: 'nil',
      status: 'idle',
    };

    expect(postsReducer(prevState, postsActions.postAdded(post)));
  });

  it('should handle a todo being added to an existing list', () => {
    const previousState: PostState = {
      posts: [{ text: 'Run the tests', completed: true, id: ' 0' }],
      error: 'nil',
      status: 'fulfilled',
    };

    expect(postsReducer(previousState, postsActions.postAdded(post))).toEqual([
      { text: 'Run the tests', completed: true, id: 0 },
      { text: 'Use Redux', completed: false, id: 1 },
    ]);
  });
});
