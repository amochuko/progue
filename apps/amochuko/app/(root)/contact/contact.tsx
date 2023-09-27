import './contact.scss';

interface ContactProps {
  img: string;
}
export const Contact: React.FC<ContactProps> = (props) => {
  function handleSumit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(e.target);
  }

  return (
    <section className='contact' id='contact'>
      <h2 className='lead-text'>Contact</h2>
      <div className='contact__illustration'>
        <img src={props.img} alt='contact illustration' />
      </div>
      <div className='contact__form'>
        <form onSubmit={(e) => handleSumit(e)}>
          <input type='text' placeholder='Email'  name='email'/>
          <textarea
            name='message'
            placeholder='Message'
            id=''
            cols={30}
            rows={10}
          ></textarea>

          <button type='submit'>Send</button>
        </form>
      </div>
    </section>
  );
};
