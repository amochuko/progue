import { Hero } from '../Hero/hero';
import { NavBar } from '../navbar/nav-bar';

export const Header = () => {
  return (
    <>
      <NavBar logo_title='Plantie' />
      <Hero />
    </>
  );
};
