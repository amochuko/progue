interface Props {
  href: string;
  title: string;
  key: string;
  handleClose: Function;
}

export const MenuItem = (props: Props) => {
  return (
    <li key={props.key} onClick={() => props.handleClose()}>
      <a href={props.href}>{props.title} </a>
    </li>
  );
};
