import { format } from '../../../../utils/lib';
import { SearchForm } from '../forms/search/serach';
import './hero.scss';

interface HeroProps {
  bgImage?: string;
}

export function Hero(props: HeroProps) {
  return (
    <>
      <div
        className='hero-image'
        style={{ backgroundImage: props.bgImage && props.bgImage }}
      >
        <img src="'../../assets/Hero_.png'" alt='' />
        <div className='hero-text'>
          <h1>
            {format.titleCase({
              str: 'Bring serenity to your place with interior plants',
              char: 'first',
            })}
          </h1>

          <div>
            <p>
              {format.titleCase({
                str:
                  'find your dream plant for your home decoration with us. and we will make it happen.',
                char: 'first',
              })}
            </p>
          </div>
          <div>
            <div>
              <SearchForm btnTitle='' placeholderText='Search plants... ' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
