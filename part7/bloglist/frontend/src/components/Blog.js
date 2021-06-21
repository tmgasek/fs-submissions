import React from 'react';
import blogService from '../services/blogs';

const Blog = ({ own, blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleViewLog = async (id) => {
    const singleView = await blogService.getOne(id);
    console.log(singleView);
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
        {own && (
          <button id="deleteBtn" onClick={() => handleDelete(blog)}>
            delete
          </button>
        )}
        <button onClick={() => handleViewLog(blog.id)}>view</button>
      </div>
    </div>
  );
};

export default Blog;
