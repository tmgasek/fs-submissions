import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { initBlogs } from './reducers/blogReducer';
import { loadUser, logoutUser } from './reducers/currUser';
import { initUsers } from './reducers/usersReducer';

import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Users from './components/Users';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const currUser = useSelector((state) => state.currUser);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(initBlogs());
    dispatch(initUsers());
  }, [dispatch]);

  const logOut = () => {
    dispatch(logoutUser());
    console.log('logged out');
  };

  return (
    <div>
      <Router>
        <div>
          <Link to="/">home</Link>
          <br></br>
          <Link to="/users">users</Link>
        </div>
        <Notification />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
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
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
