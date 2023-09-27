import './intro.scss';

interface IntroProps {
  heroImg: string;
}
export const Intro: React.FC<IntroProps> = (props) => {
  return (
    <section className='intro' id='intro'>
      <div className='intro__left'>
        <div className='intro__left__img'>
          <img src={props.heroImg} alt='lizard guy' />
        </div>
      </div>
      <div className='intro__right'>
        <div className='intro__right__wrapper'>
          <h2>Hi there! </h2>
          <h1>I'm, Jon Doe</h1>
          <h3>
            Freelancer{' '}
            <span>
              <i>Developer!</i>
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
};
