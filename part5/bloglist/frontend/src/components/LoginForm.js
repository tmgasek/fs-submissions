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
          type="text"
          value={username}
          name="username"
          onChange={handleUsernameChange}
        ></input>
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
