import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer';

const Blog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const currUser = useSelector((state) => state.currUser);
  const blog = blogs.find((blog) => blog.id === id);

  const [comment, setComment] = useState('');

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blog) {
    return null;
  }

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
        <form onSubmit={handleCommentClick}>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <div>
          <h2>comments</h2>
          {blog.comments.map((c) => (
            <div key={c}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
