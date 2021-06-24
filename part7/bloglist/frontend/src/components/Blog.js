import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const currUser = useSelector((state) => state.currUser);
  const blog = blogs.find((blog) => blog.id === id);

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} by {blog.author}{' '}
      </div>
      <div>
        <div> {blog.url}</div>
        <div>op: {blog.user.name} </div>
        <div id="likes">{blog.likes} likes</div>
        <button id="likeBtn" onClick={() => handleLike(blog)}>
          like
        </button>
        {currUser.name === blog.user.name && (
          <button id="deleteBtn" onClick={() => handleDelete(blog)}>
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
