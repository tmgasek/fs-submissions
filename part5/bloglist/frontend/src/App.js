import React, { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [message, setMessage] = useState({
    type: '',
    content: '',
  });
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sortBlogs = (blogsArr) => {
    const sortedBlogs = blogsArr.sort((a, b) => {
      const aLikes = a.likes;
      const bLikes = b.likes;

      return bLikes - aLikes;
    });
    return sortedBlogs;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setMessage({
        type: 'success',
        content: `${user.username} logged in successfully`,
      });
      setTimeout(() => {
        setMessage({});
      }, 3000);
      setUsername('');
      setPassword('');

      console.log(user);
    } catch (exception) {
      setMessage({ type: 'error', content: 'wrong username / password' });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  };

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    blogFormRef.current.toggleVisibility();
    setMessage({
      type: 'success',
      content: `${returnedBlog.title} by ${returnedBlog.author} has been added.`,
    });
    setTimeout(() => {
      setMessage({});
    }, 3000);
  };

  const updateBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject);
    const updatedBlogs = blogs.map((blog) =>
      blog.id !== id ? blog : returnedBlog
    );
    setBlogs(sortBlogs(updatedBlogs));
  };

  const deleteBlog = async (id) => {
    await blogService.remove(id);
    const updatedBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(sortBlogs(updatedBlogs));
  };

  const logOut = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    console.log('logged out');
    //set message logged out
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

  const blogForm = () => {
    return (
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    );
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Notification type={message.type} content={message.content} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button id="logOutBtn" onClick={logOut}>
            log out
          </button>
          {blogForm()}
          <BlogList
            user={user}
            blogs={blogs}
            updateLikes={updateBlog}
            deleteBlog={deleteBlog}
          />
        </div>
      )}
    </div>
  );
};
export default App;
