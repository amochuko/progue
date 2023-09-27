import { CSSProperties } from 'react';
import './card.scss';

interface CardProps {
  children?: React.ReactNode;
  styles?: CSSProperties;
}
export const Card = (props: CardProps) => {
  return (
    <div className='card'>
      <div className='card-header'>
        pot floweer
        <div className='card-img'>img here</div>
      </div>
      <div className='card-footer'>
        <p>$65.00</p>
      </div>
    </div>
  );
};
