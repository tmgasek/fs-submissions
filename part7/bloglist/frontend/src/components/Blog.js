import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const Blog = ({ own, blog }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

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
      dispatch(deleteBlog(blog));
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
          <button id="likeBtn" onClick={() => dispatch(likeBlog(blog))}>
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
