import React, { Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import { Spinner } from '../../components/spinner';
import { useAppDispatch, useAppSelector } from '../../redux-store';
import { PostExcerpt } from './post-excerpt';
import { fetchPosts, getAllPosts } from './post-slice';

export function PostList() {
  const state = useAppSelector(getAllPosts);
  const dispatch = useAppDispatch();

  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  // get data over wire
  React.useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content: React.ReactElement | React.ReactElement[];

  if (postStatus === 'loading') {
    content = <Spinner loading={true} size='24px' color='red' />;
  } else if (postStatus === 'fulfilled') {
    // sort post in reverse chronololgical order by datetime string
    const sortedPosts = state.posts
      .slice()
      .sort((a: any, b: any) => b.date.localeCompare(a.date));

    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else {
    content = <div>{error}</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className='posts-list'>
        {/* <AddPostForm /> */}
        <h2>Posts</h2>
        {content}
      </section>
      <NavLink to='posts/add'>New Posts</NavLink>
      <NavLink to='/users'>Users</NavLink>
    </Suspense>
  );
}
