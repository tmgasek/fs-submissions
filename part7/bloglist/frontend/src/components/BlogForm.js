import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import Toggleable from './Toggleable';
import { Button } from '@material-ui/core';
import { useStyles } from '../utils/styles';

import { TextField } from '@material-ui/core';

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const classes = useStyles();

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
  //   <TextField
  //   className={classes.field}
  //   label="username"
  //   id="username"
  //   value={username}
  //   onChange={({ target }) => handleUsernameChange(target)}
  //   error={usernameErr}
  // ></TextField>

  return (
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <div>
        <h2>new blog</h2>
        <form>
          <TextField
            className={classes.field}
            label="title"
            id="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          ></TextField>

          <TextField
            className={classes.field}
            label="author"
            id="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          ></TextField>

          <TextField
            className={classes.field}
            label="url"
            id="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          ></TextField>
        </form>
      </div>
      <Button
        color="primary"
        variant="contained"
        size="small"
        id="submitBlogBtn"
        onClick={addBlog}
      >
        save
      </Button>
    </Toggleable>
  );
};

export default BlogForm;
