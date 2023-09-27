import './menu.scss';

interface Props {
  setMenuOpen: Function;
  menuOpen: boolean;
  //   menuItem: MenuListProps
}
const list = [
  { title: 'Home', href: '#intro' },
  { title: 'Portfolio', href: '#portfolio' },
  { title: 'Works', href: '#works' },
  { title: 'Testimonial', href: '#testimonials' },
  { title: ' Contact', href: '#contact' },
];

export default function Menu(props: Props) {
  const handleClose = () => {
    props.setMenuOpen(false);
  };

  return (
    <div className={`menu ${props.menuOpen && 'active'}`}>
      <ul>
        {list.map((itm, idx) => (
          <li key={idx.toString()} onClick={handleClose}>
            <a href={itm.href}>{itm.title}</a>
          </li>
        ))}
      </ul>
      {/* <MenuList menu={props.menuItem} /> */}
    </div>
  );
}
