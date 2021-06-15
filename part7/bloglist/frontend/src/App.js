import React, { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';

import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    setUser(user);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      storage.saveUser(user);
      dispatch(
        setNotification(
          'success',
          `${user.username} logged in successfully`,
          3000
        )
      );
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('error', 'wrong username / password', 3000));
    }
  };

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    blogFormRef.current.toggleVisibility();
    dispatch(
      setNotification(
        'success',
        `${returnedBlog.title} by ${returnedBlog.author} has been added.`,
        3000
      )
    );
  };

  const handleLike = async (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };
    await blogService.update(id, likedBlog);
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? likedBlog : blog
    );
    dispatch(setNotification('success', 'hello', 2000));
    setBlogs(updatedBlogs);
  };

  const handleRemove = async (id) => {
    await blogService.remove(id);
    const updatedBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(updatedBlogs);
  };

  const logOut = () => {
    storage.logoutUser();
    setUser(null);
    console.log('logged out');
  };

  const loginForm = () => {
    return (
      <Toggleable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Toggleable>
    );
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button id="logOutBtn" onClick={logOut}>
            log out
          </button>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
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
                  handleRemove={handleRemove}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
