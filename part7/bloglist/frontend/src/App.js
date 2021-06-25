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
import User from './components/User';
import Blog from './components/Blog';

import {
  Typography,
  Button,
  Container,
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: grey[200],
    },
  },
  typography: {
    fontFamily: 'Lato',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export const useStyles = makeStyles({
  btn: {
    marginBottom: 10,
  },
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
  },
});

const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
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
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Typography
            variant="h5"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            Blogs App
          </Typography>
          <div>
            <Link to="/">home</Link>
            <br></br>
            <Link to="/users">users</Link>
          </div>
          <Notification />
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              {currUser === null ? (
                <LoginForm />
              ) : (
                <div>
                  <p>{currUser.name} logged in</p>
                  <Button
                    className={classes.btn}
                    color="secondary"
                    variant="contained"
                    size="small"
                    id="logOutBtn"
                    onClick={logOut}
                  >
                    log out
                  </Button>

                  <BlogForm />
                  <Blogs currUser={currUser} />
                </div>
              )}
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};
export default App;
