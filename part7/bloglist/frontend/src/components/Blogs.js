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

/*
THE ERROR IS HAPPENING BECAUSE UPON LIKING A POST IT CHANGES FROM:
{title: "blog2", author: "adam", url: "url2", likes: 12, user: {…}, …}
author: "adam"
id: "60ca734ef83eb235f384bc3f"
likes: 12
title: "blog2"
url: "url2"
user: {username: "usr1", name: "Adam", id: "60c343979e73ee25cb22ec9e"}
__proto__: Object

TO

{title: "blog2", author: "adam", url: "url2", likes: 13, user: "60c343979e73ee25cb22ec9e", …}
author: "adam"
id: "60ca734ef83eb235f384bc3f"
likes: 13
title: "blog2"
url: "url2"
user: "60c343979e73ee25cb22ec9e"
__proto__: Object

LOOK AT THE USER VALUE.

NEED TO SOMEHOW FIND THE USER
OR
CHANGE THE UPDATEDBLOG VAR IN REDUCER
*/
