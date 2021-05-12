import React, { useState, useEffect } from 'react';
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
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    const returnedBlog = await blogService.create(newBlogObject);
    setBlogs(blogs.concat(returnedBlog));
    setMessage({
      type: 'success',
      content: `${returnedBlog.title} by ${returnedBlog.author} has been added.`,
    });
    setTimeout(() => {
      setMessage({});
    }, 3000);
    setNewAuthor('');
    setNewTitle('');
    setNewUrl('');
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
      <Toggleable buttonLabel="new blog">
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newAuthor={newAuthor}
          setNewAuthor={setNewAuthor}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
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
          <button onClick={logOut}>log out</button>
          {blogForm()}
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};
export default App;
