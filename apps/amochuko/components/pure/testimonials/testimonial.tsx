import { Twitter, YouTube } from '@mui/icons-material';
import { format } from '../../../utils/lib';
import './testimonial.scss';

const testimony = [
  {
    id: '1',
    name: 'alex',
    position: 'ceo',
    company: 'JukeBox',
    img: 'assets/lizard-guy.jpeg',
    link1: '',
    link2: '',
    description:
      'Excepturirnatur velit est expedita culpa iusto atque optio illo  iure! Est.',
  },
  {
    id: '2',
    name: 'rise',
    position: 'account',
    company: 'JukeBox',
    img: 'assets/lizard-guy.jpeg',
    link1: 'assets/lizard-guy.jpeg',
    link2: 'assets/lizard-guy.jpeg',
    description:
      'Excepturirnatur velit est expedita culpa iusto atque optio illo  iure! Est.',
  },
  {
    id: '3',
    name: 'Givether',
    position: 'DevOps',
    company: 'FileCoin',
    img: 'assets/lizard-guy.jpeg',
    link1: 'assets/lizard-guy.jpeg',
    link2: 'assets/lizard-guy.jpeg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit Excepturirnatur velit est expedita culpa iusto atque optio illo  iure! Est.',
  },
];

export const Testimonial = () => {
  return (
    <div className='testimonial' id='testimonial'>
      <h1>Testimonial</h1>
      <div className='container'>
        {testimony.map((itm) => (
          <div className='card' key={itm.id}>
            <div className='top'>
              <Twitter className='left' />
              <img className='user' src={itm.img} alt={itm.name} />
              <YouTube className='right' />
            </div>
            <div className='testimony'>
              {itm.description.length > 100
                ? itm.description.slice(0, 100)
                : itm.description}
            </div>

            <div className='bottom'>
              <h3>{format.titleCase({ str: itm.name, char: 'first' })}</h3>
              <h4>
                {itm.position.length < 4
                  ? itm.position.toUpperCase()
                  : format.titleCase({
                      str: itm.position,
                      char: 'first',
                    })}{' '}
                @ {format.titleCase({ str: itm.company, char: 'first' })}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
