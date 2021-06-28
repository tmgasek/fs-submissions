import React from 'react';
import { Container } from '@material-ui/core';

const Layout = ({ children }) => {
  return (
    <div>
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
