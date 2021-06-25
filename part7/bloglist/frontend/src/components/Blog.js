import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer';

import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField,
} from '@material-ui/core';

import { useStyles } from './Layout';

const Blog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const currUser = useSelector((state) => state.currUser);
  const blog = blogs.find((blog) => blog.id === id);

  const [comment, setComment] = useState('');

  const classes = useStyles();

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (
      window.confirm(`do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      history.push('/');
      dispatch(deleteBlog(blog));
    }
  };

  const handleCommentClick = async (e) => {
    e.preventDefault();

    dispatch(addComment(blog, comment));
  };

  console.log(blog);

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      {/*//////////////////////////////////////*/}
      <Container>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">{blog.title}</Typography>
            <Typography variant="body1">{blog.url}</Typography>
            <Typography variant="body2">likes: {blog.likes}</Typography>
            <Typography variant="body2">op: {blog.user.name}</Typography>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              size="small"
              variant="contained"
              id="likeBtn"
              onClick={() => handleLike(blog)}
            >
              like
            </Button>
            {currUser.name === blog.user.name && (
              <Button
                color="secondary"
                size="small"
                variant="contained"
                id="deleteBtn"
                onClick={() => handleDelete(blog)}
              >
                delete
              </Button>
            )}
          </CardActions>
          <CardContent>
            <Typography variant="h5">Comments</Typography>
            {blog.comments.map((c) => (
              <Typography variant="body2" key={c}>
                {c}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <form onSubmit={handleCommentClick}>
              <TextField
                label="comment"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
              <div>
                <Button
                  className={classes.field}
                  variant="contained"
                  size="small"
                  color="primary"
                  type="submit"
                >
                  add comment
                </Button>
              </div>
            </form>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
};

export default Blog;
