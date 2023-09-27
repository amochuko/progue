import { Mail as MailIcon, Person as PersonIcon } from '@mui/icons-material';
import './topbar.scss';

export const TopBar = (props: { menuOpen: boolean; setMenuOpen: Function }) => {
  const handleOpen = () => {
    props.setMenuOpen(!props.menuOpen);
  };

  return (
    <div className={`topbar ${props.menuOpen && 'active'}`}>
      <div className='wrapper'>
        <div className='left'>
          <a href='#intro' className='logo'>
            .genius
          </a>
          <div className='itemContainer'>
            <PersonIcon className='icon' />
            <span>+44 6748 868 2458</span>
          </div>
          <div className='itemContainer'>
            <MailIcon className='icon' />
            <span>me@example.com</span>
          </div>
        </div>

        <div className='right'>
          <div className='hamburger' onClick={handleOpen}>
            <span className='line1'></span>
            <span className='line1'></span>
            <span className='line1'></span>
          </div>
        </div>
      </div>
    </div>
  );
};
