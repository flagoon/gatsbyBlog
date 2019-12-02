import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledLink = styled(Link)`
  padding-right: 1rem;
  text-decoration: none;
  color: inherit;
`;

const MenuItem = ({ text }: { text: string }): JSX.Element => {
  return (
    <h3>
      <StyledLink to={`/${text.toLocaleLowerCase()}`}>{text}</StyledLink>
    </h3>
  );
};

export default MenuItem;
