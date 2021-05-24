import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, updateLikes, deleteBlog, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
