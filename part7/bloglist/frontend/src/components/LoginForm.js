import React, { useState } from 'react';
import { loginUser } from '../reducers/currUser';
import { useDispatch } from 'react-redux';
import Toggleable from './Toggleable';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
          username
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button id="submitBtn" type="submit">
          login
        </button>
      </form>
    </Toggleable>
  );
};

export default LoginForm;
