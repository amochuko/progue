import { renderWithProviders } from '../../../../redux-store/__tests__/utils/rennder-with-provider';
import { PostList } from '../../post-list';
import { Post } from '../../post-slice';

describe('Post', () => {
  it('should be preloaded with state', () => {
    const initialState: Post[] = [
      { id: '5', title: 'Buiy Milk', body: 'string', author: 'string' },
    ];

    const { getByText } = renderWithProviders(<PostList />, {
      preloadedState: {
        posts: initialState as any,
      },
    });

    expect(getByText(/james bay/i)).toBeInTheDocument();
  });
});
