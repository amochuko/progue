import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import './modal.scss';

interface ModalProp {
  cb?: (e: Event) => void;
  attr: ReactNode;
  children: ReactNode;
  cssStyle?: Partial<CSSProperties>;
  isVisible: boolean;
}
/**
 *
 * @param param0
 * @returns
 */
export const Modal: React.FC<ModalProp> = (props) => {
  const { attr, children } = props;

  console.log('props.isVisible:', props.isVisible);

  const [show, setShow] = useState(props.isVisible);

  const handleClose = () => {
    setShow(!show);
  };

  useEffect(() => {
    // setShow(show);
  }, [show]);

  return (
    <div
      className='modal'
      role='dialog'
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className='modal__header'>
        <label htmlFor='closeModal' className='modal__header__label'>
          <span className='modal__header__label-close'></span>
          <input
            id='closeModal'
            type='checkbox'
            className='modal__header__label-input'
            onChange={handleClose}
          />
        </label>
      </div>

      <div className='modal__body'>{children}</div>
      <div className='modal__footer'>{attr}</div>
    </div>
  );
};
