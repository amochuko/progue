import { useState } from 'react';
import Menu from './nav-menu-bar/menu';
import './pure.scss';
import { TopBar } from './top-bar/topbar';

export const Pure = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
    </>
  );
};
