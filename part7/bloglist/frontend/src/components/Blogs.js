import React from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import Blog from './Blog';

const Blogs = ({ blogs, user }) => {
  const dispatch = useDispatch();

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (
      window.confirm(`do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            own={user.username === blog.user.username}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default Blogs;
