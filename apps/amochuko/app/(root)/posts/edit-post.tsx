import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux-store/config-store';
import { postsActions, getPostById } from './post-slice';

export default function EditPostForm() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = params;

  const post = useAppSelector((state) => getPostById(state, String(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);

  function onTitleChanged(e: any) {
    setTitle(e.target.value);
  }

  function onContentChanged(e: any) {
    setContent(e.target.value);
  }

  function onSavePostClicked() {
    if (title && content && post) {
      dispatch(postsActions.postUpdated({ id: post.id, title, body: content, date: undefined }));
      navigate(`/`);
      // navigate(`/posts/${postId}`);
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title</label>
        <input
          type='type'
          id='postTitle'
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor='postContent'>Content</label>
        <textarea
          id='postContent'
          name='postCount'
          value={content}
          onChange={onContentChanged}
        />
        <button type='button' onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
}
