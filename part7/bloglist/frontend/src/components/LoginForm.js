import React, { useState } from 'react';
import { loginUser } from '../reducers/currUser';
import { useDispatch } from 'react-redux';
import Toggleable from './Toggleable';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useStyles } from './Layout';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleUsernameChange = (target) => {
    if (!target.value) {
      setUsernameErr(true);
    } else {
      setUsernameErr(false);
    }
    setUsername(target.value);
  };

  const handlePasswordChange = (target) => {
    if (!target.value) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }
    setPassword(target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username,
        password,
      })
    );
    setUsername('');
    setPassword('');
  };

  return (
    <Toggleable buttonLabel="login">
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            className={classes.field}
            label="username"
            id="username"
            value={username}
            onChange={({ target }) => handleUsernameChange(target)}
            error={usernameErr}
          ></TextField>
        </div>
        <div>
          <TextField
            className={classes.field}
            label="password"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => handlePasswordChange(target)}
            error={passErr}
          ></TextField>
        </div>
        <Button
          color="primary"
          variant="contained"
          size="small"
          id="submitBtn"
          type="submit"
        >
          login
        </Button>
      </form>
    </Toggleable>
  );
};

export default LoginForm;
