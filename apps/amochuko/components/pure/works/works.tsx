import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { portfolioData } from '../data';
import './works.scss';

type B = typeof portfolioData['branding'];

export const Works = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [data, setData] = useState<B>([]);

  useEffect(() => {
    setData(portfolioData['featured']);
  }, [data]);

  function handleSlider(path: 'right' | 'left') {
    if (path === 'left') {
      setCurrentSlider(currentSlider > 0 ? currentSlider - 1 : 2);
    } else {
      setCurrentSlider(currentSlider < data.length - 1 ? currentSlider + 1 : 0);
    }
  }

  return (
    <div className='works' id='works'>
      <div
        className='slider'
        style={{ transform: `translateX(-${currentSlider * 100}vw)` }}
      >
        {data.map((d, i) => (
          <div className='container' key={i}>
            <div className='item'>
              <div className='left'>
                <div className='leftContainer'>
                  <div className='icon'>
                    <img src={d.icon} alt={d.title} />
                  </div>
                  <h2>{d.title}</h2>
                  <p>{d.description}</p>
                  <span>Projects</span>
                </div>
              </div>
              <div className='right'>
                <img src={d.img} alt={d.title} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChevronLeft
        fontSize='large'
        className='arrow left '
        onClick={() => handleSlider('left')}
      />

      <ChevronRight
        className='arrow right'
        onClick={() => handleSlider('right')}
      />
    </div>
  );
};
