import React, { useEffect } from 'react';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { loadUser, logoutUser } from './reducers/currUser';
import Blogs from './components/Blogs';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const currUser = useSelector((state) => state.currUser);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const logOut = () => {
    dispatch(logoutUser());
    console.log('logged out');
  };

  return (
    <div>
      <Notification />
      {currUser === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>{currUser.name} logged in</p>
          <button id="logOutBtn" onClick={logOut}>
            log out
          </button>
          <BlogForm />
          <Blogs blogs={blogs} user={currUser} />
        </div>
      )}
    </div>
  );
};
export default App;
