import { MenuItem } from './menu-item';

export type MenuListProps = {
  name: string;
  href: string;
  handleClose: Function;
};

interface Props {
  menu: MenuListProps[];
}

export const MenuList = (props: Props) => {
  return props.menu.map((itm, idx) => (
    <MenuItem href={itm.href} title={itm.name} key={idx.toString()} handleClose={itm.handleClose} />
  ));
};
