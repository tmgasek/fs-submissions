import React from 'react';

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={handleUsernameChange}
        ></input>
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        ></input>
      </div>
      <button id="submitBtn" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
