import React, { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';

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
      setMessage({
        type: 'success',
        content: `${user.username} logged in successfully`,
      });
      setTimeout(() => {
        setMessage({});
      }, 3000);
      setUsername('');
      setPassword('');
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


//test