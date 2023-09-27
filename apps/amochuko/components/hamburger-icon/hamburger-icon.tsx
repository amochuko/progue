import { CSSProperties } from 'react';
import './hambuger-icon.scss';

interface HamburgerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Function;
  style?: Partial<CSSProperties>;
}

export const HamburgerIcon: React.FC<HamburgerProps> = (props) => {
  const onhandleOpen = () => {
    props.setIsMenuOpen(!props.isMenuOpen);
  };

  return (
    <div className='hamburger' role='menu' aria-label='context menu' onClick={onhandleOpen}>
      <div
        className={`hamburger__icon_wrapper ${
          props.isMenuOpen ? 'active' : ''
        }`}
      >
        {new Array(3).fill(3).map((n, i) => (
          <span
            key={n + i}
            className='hamburger__icon_child'
            style={props.style}
          ></span>
        ))}
      </div>
    </div>
  );
};
