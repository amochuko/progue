import { useState } from 'react';
import { format } from '../../utils/lib';
import { HamburgerIcon } from '../hamburger-icon';
import { ErrorBoundary } from '../hoc';
import './header.scss';

export type NavMenu = {
  id: string;
  title: string;
  description: string;
  href: string;
  target?: '_blank' | '_parent' | '_top';
};

interface HeaderProps {
  logo: string;
  navMenu: NavMenu[];
}

export const Header: React.FC<HeaderProps> = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ErrorBoundary>
      <header className='header' role='navigation' aria-label='header'>
        <span>
          <div className='logo'>
            <a href='/'>{props.logo}</a>
          </div>
          <nav className='nav-menu'>
            <HamburgerIcon
              isMenuOpen={menuOpen}
              setIsMenuOpen={setMenuOpen}
              style={{
                marginTop: '5px',
                backgroundColor: 'white',
              }}
            />
            <ul
              style={{
                backgroundColor: 'var(--darkBlue)',
                color: 'white',
              }}
              className={`nav-menu__list${menuOpen ? '-active' : ''}`}
              aria-label='navigation menu list'
            >
              {props.navMenu.length > 0
                ? props.navMenu?.map((itm, i) => (
                    <li
                      key={i * 2}
                      className='nav-menu__list_itm'
                      role='menuitem'
                    >
                      <a href={`#${itm.href.toLowerCase()}`}>
                        {format.titleCase({ str: itm.title, char: 'first' })}
                      </a>
                    </li>
                  ))
                : 'No title'}
            </ul>
          </nav>
        </span>
      </header>
    </ErrorBoundary>
  );
};
