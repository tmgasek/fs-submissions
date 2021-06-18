import React from 'react';
import { useSelector } from 'react-redux';

const User = ({ user }) => {
  return <div>{user.name}</div>;
};

const Users = () => {
  const users = useSelector((state) => state.users);

  return users.map((user) => <User key={user.id} user={user} />);
};

export default Users;
