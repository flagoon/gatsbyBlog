import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { Menu } from './Menu';

const Container = styled.div`
  max-width: 960px;
  margin: 1rem auto;
  padding: 0 1rem;
`;

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <Container>
      <Header />
      <Menu />
      {children}
    </Container>
  );
};

export default Layout;
