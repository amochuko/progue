 

import { wrapper } from './app';
import './styles/style.css';

function main(elem: HTMLElement) {
  document.body.appendChild(elem);
}

main(wrapper);
