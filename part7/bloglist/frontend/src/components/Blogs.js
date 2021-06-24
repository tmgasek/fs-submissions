import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className="blog" style={blogStyle} key={blog.id}>
            <div>
              <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>by{' '}
              {blog.author}{' '}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
