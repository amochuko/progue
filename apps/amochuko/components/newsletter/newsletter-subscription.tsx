import iconCheck from './assets/images/icon-success.png';
import './style/newsletter-sub.scss';

interface NewletterSubscriptionProps {
  email: string;
  show: boolean;
  setEmail: Function;
}

export function NewletterSubscription(props: NewletterSubscriptionProps) {
  //
  function handleSubmission(e: any) {
    props.setEmail('');
    e.preventDefault();
    const dialog = document.querySelector('dialog');
    dialog?.remove();

    window.location.replace(`${window.location.origin}/#/portfolio`);
  }

  return (
    <div
      className='newsletter_sub'
      style={{ display: props.show ? 'block' : 'none' }}
    >
      <div
        className='newsletter_sub__header'
        style={{ backgroundImage: 'none' }}
      >
        <div className='imgWrapper'>
          <img src={iconCheck} alt='' />
        </div>
      </div>

      <div className='newsletter_sub__body'>
        <h3 className='newsletter_sub__body--lead'>
          Thanks for <span>subscribing!</span>
        </h3>
        <p className='newsletter_sub__body--para'>
          A confirmation email has been sent to <b> {props.email}</b>. Please
          open it and click the button inside to confirm your subscription.
        </p>
      </div>

      <div className='newsletter_sub__footer'>
        <form action='' onSubmit={handleSubmission}>
          <button type='submit'>Dismiss message</button>
        </form>
      </div>
    </div>
  );
}
