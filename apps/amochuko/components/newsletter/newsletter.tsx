import React, { useState } from 'react';
import { format } from '../../utils/lib';
import newsLetterThumbnailImg from './design/mobile-design.jpg';
import { NewletterSubscription } from './newsletter-subscription';
import './style/newsletter.scss';

export { newsLetterThumbnailImg };

interface NewsLetterProps {
  heading: string;
  description: string;
  items: string[];
  img: string;
  imgTitle: string;
}

/**
 *
 * @param param0 {heading} title of component
 * @param param1 {description} description of component
 * @param param2 {items[]} itemized description of service
 * @param param3 {img} Imgae to component
 * @returns HTMLElement {Newsletter}
 */
export function Newsletter({
  heading,
  description,
  items,
  img,
  imgTitle,
}: NewsLetterProps) {
  const inputRef = React.createRef<HTMLInputElement>();
  const accentNewsletter = '#e1633d';
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [sub, setSub] = useState(false);

  function onInput(e: any) {
    const inputValue = e.target.value;
    setEmail(inputValue);
  }

  function handleSubmission(e: any) {
    const inputValue = e.target.value;
    e.preventDefault();

    if (!inputValue) {
      setError(true);
    }

    if (format.isValidEmail(email)) {
      setError(false);
      setSub(!sub);
    }
  }

  return (
    <div>
      <div className='newsletter'>
        <div
          className='newsletter__header'
          style={{ display: !sub ? 'block' : 'none' }}
        >
          <img
            src={String(img)}
            alt={imgTitle}
            className='newsletter__header__img'
          />
        </div>
        <div style={{ display: !sub ? 'block' : 'none' }}>
          <div className='newsletter__body'>
            <h3 className='newsletter__body__lead'>{heading}</h3>
            <p className='newsletter__body__para'>{description}</p>
            <ul className='newsletter__body__list'>
              {items.map((itm) => (
                <li
                  key={itm + Math.random()}
                  className='newsletter__body__list--item'
                >
                  {format.titleCase({ str: itm, char: 'first' })}
                </li>
              ))}
            </ul>
          </div>
          <div className='newsletter__footer'>
            <form
              name='newsletter-form'
              className='newsletter__footer__form'
              onSubmit={handleSubmission}
            >
              <div className='newsletter__footer__form__wrap'>
                <label
                  className='newsletter__footer__form__label'
                  htmlFor='newsletter_email'
                >
                  Email Address
                </label>

                <label
                  style={{
                    display: error ? 'block' : '',
                  }}
                  className={`newsletter__footer__form__label-error`}
                  htmlFor='labelError'
                >
                  Valid email required
                </label>
              </div>
              <input
                type='text'
                name='email'
                ref={inputRef}
                value={email}
                style={{
                  backgroundColor: error ? `rgba(239, 175, 155, 0.2)` : '',
                  border: error ? `1px solid ${accentNewsletter} ` : '',
                }}
                placeholder='email@company.com'
                onChange={onInput}
                className='newsletter__footer__form__input'
              />
              <button className='newsletter__footer__form__button'>
                Subscribe to monthly newsletter
              </button>
            </form>
          </div>
        </div>
      </div>
      <NewletterSubscription email={email} show={sub} setEmail={setEmail} />
    </div>
  );
}
