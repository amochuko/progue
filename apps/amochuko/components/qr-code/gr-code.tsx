import { Card, CardProps } from '../card/card';
import './styles/qr-code.scss';

interface QRCodeProps extends CardProps {}

/**
 * @dev A QRCode component
 * @param param0 {h3Txt} Heading text
 * @param param1 {pTxt} Paragraph text
 * @param param2 {img} HTMLImageElement
 * @param param3 {footerAttr} HTMLImageElement
 * @returns HTMLElement
 */
export function QRCode({ h3Txt, pTxt, img, imgTitle }: QRCodeProps) {
  return (
    <div className='row'>
      <div className='qr-code'>
        <div className='qr-code__wrapper'>
          <Card h3Txt={h3Txt} img={img} imgTitle={imgTitle} pTxt={pTxt} />
        </div>
      </div>
    </div>
  );
}
