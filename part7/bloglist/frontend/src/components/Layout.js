import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

const Layout = ({ children }) => {
  return (
    <div>
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
      <div>{children}</div>
    </div>
  );
};

export default Layout;
