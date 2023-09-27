import { CSSProperties } from 'react';
import './card.scss';

export interface CardProps {
  h3Txt: string;
  pTxt: string;
  img: string;
  imgTitle: string;
  style?: Partial<CSSProperties>;
  tagName?: keyof HTMLElementTagNameMap;
}

/**
 * @dev A Card component
 * @param param0 {h3Txt} Heading text
 * @param param1 {pTxt} Paragraph text
 * @param param2 {img} HTMLImageElement
 * @param param3 {style} CSSStyleDeclaration
 * @param param4 { tagName}  keyof HTMLElementTagNameMap
 * @param param5 { imgTitle}  title for the image
 * @returns HTMLElement
 */
export function Card({
  h3Txt,
  pTxt,
  img,
  style = {},
  tagName = 'h1',
  imgTitle,
}: CardProps) {

  return (
    <div className='card card__size' style={style}>
      <img src={img} alt={imgTitle} />
      <h3 className='card--heading'>{h3Txt}</h3>
      <p className='card--para'>{pTxt}</p>
    </div>
  );
}
