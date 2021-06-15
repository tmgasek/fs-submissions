import React, { useState } from 'react';
const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const label = visible ? 'hide' : 'view';

  const handleDeleteClick = () => {
    if (
      window.confirm(`do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      handleRemove(blog.id);
    }
  };
  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} by {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div> {blog.url}</div>
          <div>op: {blog.user.name} </div>
          <div id="likes">{blog.likes} likes</div>
          <button id="likeBtn" onClick={() => handleLike(blog.id)}>
            like
          </button>
          {own && (
            <button id="deleteBtn" onClick={handleDeleteClick}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
