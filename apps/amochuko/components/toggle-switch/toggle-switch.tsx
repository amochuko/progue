import React, { CSSProperties, ChangeEvent } from 'react';
import './toggle-switch.css';

interface ToggleProps {
  id: string;
  cb: (e: any) => void;
  style?: CSSProperties;
  eventType: keyof HTMLElementEventMap;
}

/**
 * @param id ID string to identify the Input in the DOM
 * @param cb Callback Function to execute on Input click
 * @param type The type of Input - 'checkbox' | 'radio' | 'text' | 'textarea'
 * @param styles (optional) CSS Styles Declaration to decorate the Input
 * @returns HTMLInputElement
 */
export const ToggleSwitch: React.FC<ToggleProps> = (props) => {
  const { id, cb, style = {} } = props;

  const handleClick = (e: ChangeEvent) => {
    cb(e);
  };
  return (
    <>
      <label htmlFor={id} className='switch' style={style}></label>
      <input
        type='checkbox'
        name={id}
        id={id}
        onChange={(e) => handleClick(e)}
      />
      <span className='slide round'> </span>
    </>
  );
};
