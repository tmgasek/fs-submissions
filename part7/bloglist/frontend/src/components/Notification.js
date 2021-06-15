import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return <div className={notification.className}>{notification.message}</div>;
};

export default Notification;
