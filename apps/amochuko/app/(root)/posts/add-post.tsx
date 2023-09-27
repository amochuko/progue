//import {ErrorBoundary} from '@progue/ui';
import { Suspense, useId, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux-store';
import { User } from '../users/user-slice';
import { addNewPost } from './post-slice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.users);

  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value);
  const onAuthorChanged = (e: any) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    console.log('saved...', title, content, userId);

    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost({ title, content, user: useId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
      } catch (err:any) {
        throw Error('Failed to save the post:', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <h2>Add a New Post</h2>
          <form>
            <label htmlFor='postTitle'>Post Title:</label>
            <input
              type='type'
              id='postTitle'
              name='postTitle'
              value={title}
              onChange={onTitleChanged}
            />
            <label htmlFor='postAuthor'>Author</label>
            <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
              <option value='Select Author'>Select Author</option>
              {users &&
                users.map((usr: any) => (
                  <option key={usr.name} value={usr.id}>
                    {usr.name}
                  </option>
                ))}
            </select>
            <label htmlFor='postContent'>Content:</label>
            <textarea
              id='postContent'
              name='postContent'
              value={content}
              onChange={onContentChanged}
            />
            <button
              type='button'
              disabled={!canSave}
              onClick={onSavePostClicked}
            >
              Save Post
            </button>
          </form>
        </section>
      </Suspense>
    </>
  );
};
