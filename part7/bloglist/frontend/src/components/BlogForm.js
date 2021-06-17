import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import Toggleable from './Toggleable';

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    dispatch(
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
    );
    setNewAuthor('');
    setNewTitle('');
    setNewUrl('');
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <div>
        <h2>new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              id="title"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              id="author"
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              id="url"
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <button id="submitBlogBtn" type="submit">
            save
          </button>
        </form>
      </div>
    </Toggleable>
  );
};

export default BlogForm;
