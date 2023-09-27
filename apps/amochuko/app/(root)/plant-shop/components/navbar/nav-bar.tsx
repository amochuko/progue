import { useState } from 'react';
import { HamburgerIcon } from '../../../../components/hamburger-icon';
import { format } from '../../../../utils/lib';
import './nav-bar.scss';

const data = ['home', 'shop', 'about', 'contact'];

interface NavBarProps {
  logo_title: string | any;
}
export const NavBar: React.FC<NavBarProps> = ({ logo_title }) => {
  const [openMenu, setOpenMenu] = useState(false);

  // TODO: fix for logo image
  const img = new Image();
  if (typeof logo_title !== 'string') {
    img.src = logo_title;
  }

  return (
    <nav className='nav-bar'>
      <span className='left logo'>
        {typeof logo_title === 'string' && (
          <a href='/'>{format.titleCase({ str: logo_title, char: 'first' })}</a>
        )}
      </span>
      <div className='right'>
        <HamburgerIcon
          isMenuOpen={openMenu}
          setIsMenuOpen={setOpenMenu}
          style={{ backgroundColor: 'white' }}
        />
      </div>

      <ul className='nav-bar__list'>
        {data.map((n, idx) => (
          <li key={idx.toString()} className='nav-bar__list-item'>
            <a href={`/${n}`}>{format.titleCase({ str: n, char: 'first' })}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
