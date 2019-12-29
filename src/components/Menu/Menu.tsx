import React from 'react';
import MenuItem from './MenuItem';

const Menu = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MenuItem text="Home" />
      <MenuItem text="Porfolio" />
      <MenuItem text="Kontakt" />
    </div>
  );
};

export default Menu;
