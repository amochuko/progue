import { useAppDispatch, useAppSelector } from '../../../redux-store';
import { PortfolioType } from '../portfolio';
import { portfolioAction } from '../store/portfolio-slice';
import './portfolio-list.scss';

interface PortfolioListProps {
  portofolioTitles: { id: string; title: string }[];
  styles?: React.CSSProperties;
  setSelected: Function;
  selected: string;
  data: PortfolioType[];
}

/**
 *
 * @param props
 * @returns
 */

export const PortfolioList: React.FC<PortfolioListProps> = (props) => {
  const { show } = useAppSelector((s) => s.portfolio);
  const dispatch = useAppDispatch();

  const showPreview = () => {
    dispatch(portfolioAction.setPreview({ show: !show }));
  };

  return (
    <div className='portfolio__wrapper'>
      {/* <ul className='portfolio__wrapper__list'>
        {props.portofolioTitles.map((itm) => {
          return (
            <li
              key={itm.id.toString() + Math.sqrt(15)}
              className={
                props.selected.toLowerCase() === itm.title.toLowerCase()
                  ? `active`
                  : ''
              }
              onClick={() => props.setSelected(itm.id)}
            >
              {itm.title}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};
