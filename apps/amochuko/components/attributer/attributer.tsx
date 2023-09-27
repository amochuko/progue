import { format } from '../../utils/lib';
import './attributer.scss';

interface AttributeProp {
  name: string;
  socialLink: string;
  attrObj: {
    description: string;
    provider: string;
    socialLink: string;
  };
}

export function Attribute(props: AttributeProp) {
  return (
    <div className='attribute' aria-label='Work Attribute' role='complementary'>
      <p className='attribute--p'>
        {format.titleCase({
          str: String(props.attrObj.description),
          char: 'first',
        })}{' '}
        <span className='attribute--span'>
          <a href={props.attrObj.socialLink} target='_blank' rel='noreferrer'>
            {format.titleCase({ str: props.attrObj.provider, char: 'full' })}
          </a>{'. '}
        </span>
        <span className='attribute--span'>
          Coded by{' '}
          <a href={props.socialLink} target='_blank' rel='noreferrer'>
            {props.name}
          </a>.
        </span>
      </p>
    </div>
  );
}
