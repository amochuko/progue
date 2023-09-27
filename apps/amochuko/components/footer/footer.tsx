import { format } from '../../utils/lib';
import './footer.scss';

interface FooterProp {
  attrStr?: string;
  name: string;
}

export function Footer(args: FooterProp) {
  return (
    <footer aria-label='footer'>
      <span>
        &copy; {format.titleCase({ str: String(args.attrStr), char: 'first' })}{' '}
        {new Date().getFullYear().toString()}
      </span>
    </footer>
  );
}
