import React, { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
// import loginService from './services/login';
// import storage from './utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initBlogs } from './reducers/blogReducer';
import { loginUser, loadUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users);

  console.log('redux users', user);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(
        loginUser({
          username,
          password,
        })
      );

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

  // const createBlog = async (blogObject) => {
  //   dispatch(createBlog(blogObject));
  // blogFormRef.current.toggleVisibility();
  // dispatch(
  //   setNotification(
  //     'success',
  //     `${returnedBlog.title} by ${returnedBlog.author} has been added.`,
  //     3000
  //   )
  // );
  // };

  const logOut = () => {
    dispatch(logoutUser());
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
            <BlogForm />
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
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
