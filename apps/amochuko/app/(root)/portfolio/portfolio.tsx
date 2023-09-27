import { ReactNode, useEffect, useState } from 'react';
import { Attribute } from '../../components/attributer/attributer';
import { Modal } from '../../components/modal/modal';
import { useAppDispatch, useAppSelector } from '../../redux-store';
import { format } from '../../utils/lib';
import './portfolio.scss';
import { portfolioAction } from './store/portfolio-slice';

export type PortfolioType = {
  id: string;
  title: string;
  img: string;
  component: ReactNode;
};

interface PortfolioProps {
  portfolioData: Record<string, PortfolioType[]>;
}

/**
 *
 * @param param0 {portfolioData} Record<string,[{
  id: string;
  title: string;
  img: string;
}]>
 * @returns Portfolio 
 */
export const Portfolio: React.FC<PortfolioProps> = ({ portfolioData }) => {
  const [data, setData] = useState<PortfolioType[]>([]);
  const { show } = useAppSelector((s) => s.portfolio);
  const dispatch = useAppDispatch();

  const showPreview = () => {
    dispatch(portfolioAction.setPreview({ show: !show }));
  };

  useEffect(() => {
    const parsed = Object.values(portfolioData);
    console.log(parsed);
    // setData(parsed);
  }, [0]);

  return (
    <section className='portfolio' id='portfolio'>
      <h2 className='lead-text'>Portfolio</h2>

      {/* <PortfolioList
        data={data}
        portofolioTitles={portofolioTitles}
        setSelected={setSelected}
        selected={selected}
        styles={{ backgroundColor: 'skyblue', color: 'white' }}
      /> */}

      <div className='portfolio__wrapper__container'>
        {data &&
          data.map((itm) => (
            <div key={itm.title.toString() + Math.sqrt(5)}>
              <div className='portfolio__wrapper__container-item'>
                <img src={itm.img} alt={itm.title} onClick={showPreview} />
                <h3>{format.titleCase({ str: itm.title, char: 'first' })}</h3>
              </div>
              <Modal
                attr={
                  <Attribute
                    name='me'
                    socialLink='https://www.github.com/amochuko'
                    attrObj={{
                      description: 'Challenge by',
                      provider: 'frontend mentor',
                      socialLink: 'https://www.frontendmentor.com/amochuko',
                    }}
                  />
                }
                isVisible={show}
                children={itm.component}
              />
            </div>
          ))}
      </div>
    </section>
  );
};
