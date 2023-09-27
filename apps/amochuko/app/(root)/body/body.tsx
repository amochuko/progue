import img from '../../assets/img/image-qr-code.png';
import { Footer } from '../../components/footer/footer';
import { Header, NavMenu } from '../../components/header';
import newsLetterImgMobile from '../../components/newsletter/assets/images/newsletter-mobile.png';
import newsLetterImgDesktop from '../../components/newsletter/design/desktop-preview.jpg';
import { Newsletter } from '../../components/newsletter/newsletter';
import { QRCode } from '../../components/qr-code';
import { Contact } from '../contact';
import { Intro } from '../intro/intro';
import { Portfolio, PortfolioType } from '../portfolio';

interface BodyProps {
  get?: VoidFunction;
  setMode?: Function;
}

export const navMenu: NavMenu[] = [
  {
    id: 'ray100',
    title: 'About',
    description: 'Intro Home',
    href: 'intro',
    target: '_blank',
  },
  {
    id: 'ray103',
    title: 'portfolio',
    description: 'portfolio',
    href: 'portfolio',
    target: '_blank',
  },
  {
    id: 'ray102',
    title: 'contact',
    description: 'contact me',
    href: 'contact',
    target: '_blank',
  },
];

const portfolioData: Record<string, PortfolioType[]> = {
  'qr-code': [
    {
      id: '22',
      title: 'qr-code',
      img,
      component: (
        <QRCode
          h3Txt='Imporve your front-end skills by building projects'
          img={img}
          imgTitle='qr-code'
          pTxt='Scan the QR code to vist Frontend Mentor and take yur coding skills to the next level'
        />
      ),
    },
  ],
  newsletter: [
    {
      id: '23',
      title: 'newsletter',
      img: newsLetterImgDesktop,
      component: (
        <Newsletter
          description='Join 60,000+ product managers receiving monthly updates on:'
          heading='Stay updated!'
          items={[
            ' Product discovery and building what matters',
            'Measuring to ensure updates are a success',
            'And much more!',
          ]}
          img={newsLetterImgMobile}
          imgTitle='newsletter'
        />
      ),
    },
  ],
};

export const Body: React.FC<BodyProps> = (props) => {
  return (
    <>
      <Header logo='O.A' navMenu={navMenu} />
      <Intro heroImg={img} />
      <Portfolio portfolioData={portfolioData} />
      <Contact img={img} />
      <Footer name='o.a' attrStr='' />
    </>
  );
};
