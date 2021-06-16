import React from 'react';

const Blog = ({ own, blog, handleLike, handleDelete }) => {
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
        {own && (
          <button id="deleteBtn" onClick={() => handleDelete(blog)}>
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
