import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
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
      console.log(exception);
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

  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const BlogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const logOut = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    console.log('logged out');
    //set message logged out
  };

  const BlogForm = () => {
    return (
      <>
        <h2>new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <button type="submit">save</button>
        </form>
      </>
    );
  };

  return (
    <div>
      {user === null ? (
        LoginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>log out</button>
          {BlogList()}
          {BlogForm()}
        </div>
      )}
    </div>
  );
};
export default App;
