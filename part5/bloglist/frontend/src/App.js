import React, { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
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
      setUsername('');
      setPassword('');

      console.log(user);
    } catch (exception) {
      setErrorMessage('wrong username and/or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const addBlog = (event) => {
    event.preventDefault();

    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(newBlogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewAuthor('');
      setNewTitle('');
      setNewUrl('');
    });
  };

  const logOut = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    console.log('logged out');
    //set message logged out
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>log out</button>
          <BlogList blogs={blogs} />
          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
          />
        </div>
      )}
    </div>
  );
};
export default App;
