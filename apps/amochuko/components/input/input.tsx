import { CSSProperties, ChangeEvent } from 'react';
import './input.scss';

interface InputProps {
  id: string;
  cb: (e: any) => void;
  ref?: React.ElementRef<any>
  style?: Partial<CSSProperties>;
  type:
    | 'checkbox'
    | 'radio'
    | 'text'
    | 'textarea'
    | 'email'
    | 'phone'
    | 'password'
    | 'number'
    | 'submit';
  eventType: keyof HTMLElementEventMap;
  labelTxt: string;
  lblErrorTxt?: string;
  labelVisible: boolean;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  labelSize?: number;
  placeholderTxt: string;
}

/**
 * @param id ID string to identify the Input in the DOM
 * @param cb Callback Function to execute on Input click
 * @param type The type of Input - 'checkbox' | 'radio' | 'text' | 'textarea'
 * @param styles (optional) CSS Styles Declaration to decorate the Input
 * @param eventType keyof HTMLElementEventMap event that should be listend to
 * @returns HTMLInputElement
 */
export const Input: React.FC<InputProps> = (props) => {
  // const input_wrapper = document.createElement('div');

  // switch (labelPlacement) {
  //   case 'top':
  //     input_wrapper.classList.add('input-wrapper__top');
  //     break;
  //   case 'bottom':
  //     input_wrapper.classList.add('input-wrapper__bottom');
  //     break;
  //   case 'right':
  //     input_wrapper.classList.add('input-wrapper__right');
  //     break;
  //   default:
  //     input_wrapper.classList.add('input-wrapper__left');
  // }

  const {
    id,
    cb,
    type,
    style = {},
    eventType,
    labelTxt,
    labelVisible,
    labelSize = 12,
    labelPlacement = 'left',
    placeholderTxt,
    lblErrorTxt,
  } = props;

  const handleOnChange = (e: ChangeEvent) => {
    console.log(e);
  };

  return (
    <div className='input_wrapper'>
      <label
        htmlFor={id}
        style={{ fontSize: `${labelSize}px` }}
        className='input__label'
      >
        {labelTxt}
      </label>

      <input
        type='text'
        id={id}
        name={id}
        className='input__size'
        placeholder={placeholderTxt}
        onChange={handleOnChange}
        style={style}
      />
      <span
        id={`${id}-error`}
        style={{ fontSize: `${labelSize}px` }}
        className='input__span-error'
      >
        {lblErrorTxt ? lblErrorTxt : ''}
      </span>
    </div>
  );
};
