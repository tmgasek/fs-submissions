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
import Layout from './components/Layout';
import {
  Button,
  createMuiTheme,
  ThemeProvider,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { grey } from '@material-ui/core/colors';
import { useStyles } from './utils/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#E5E9F0',
    },
    primary: {
      main: '#434C5E',
    },
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
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.heading}>
                Bloglist App
              </Typography>
              <Typography>
                <Link className={classes.heading} to="/">
                  Home
                </Link>
              </Typography>
              <Typography className={classes.lastItem}>
                <Link className={classes.heading} to="/users">
                  Users
                </Link>
              </Typography>
              {currUser !== null && (
                <>
                  <Typography>
                    <em>{currUser.name} logged in</em>
                  </Typography>
                  <Button
                    className={classes.logOutBtn}
                    id="logOutBtn"
                    color="inherit"
                    onClick={logOut}
                  >
                    log out
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </div>
        <Layout>
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
                  <BlogForm />
                  <Blogs currUser={currUser} />
                </div>
              )}
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};
export default App;
