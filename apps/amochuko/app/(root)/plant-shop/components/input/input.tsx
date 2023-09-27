import './input.scss';

export interface InputProps {
  placeholderText: string;
  btnTitle: string;
}

export const Input = (props: InputProps) => {
  return (
    <form id='newsletter'>
      <span className='box'>
        <input
          aria-label='subscribe to newsletter'
          aria-describedby='subscribe-to-newsletter'
          id='outlined-basic'
          placeholder={props.placeholderText}
        />
        <button id='subscribe-to-newsletter'>{props.btnTitle}</button>
      </span>
    </form>
  );
};
