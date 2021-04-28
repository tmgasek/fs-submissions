import React from 'react';

export const Notification = ({ message, className }) => {
  if (message === null) return null;
  return <div className={className}>{message}</div>;
};
