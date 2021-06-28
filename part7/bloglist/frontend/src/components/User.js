import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <List>
      {user.blogs.map((blog) => (
        <ListItem key={blog.id}>
          <ListItemText primary={blog.title}></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default User;
