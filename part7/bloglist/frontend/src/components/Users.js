import React from 'react';
import { useSelector } from 'react-redux';

const User = ({ user, blogs }) => {
  return (
    <div>
      {user.name}
      <div>blogs created: {user.blogs.length}</div>
      <div>blogs total length: {blogs.length} </div>
    </div>
  );
};

const Users = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  console.log(blogs.length);
  return (
    <div>
      <h2>users</h2>
      {users.map((user) => (
        <User key={user.id} user={user} blogs={blogs} />
      ))}
    </div>
  );
};

export default Users;
