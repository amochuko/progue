import { AccountContext } from '@/context';
import { ownerAddress } from '@/utils/blogContract';
import { WalletConnectProvider, Web3Modal, ethers } from '@progue/lib';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import './globals.css';
import './layout.scss';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dapp Dashboard',
  description: 'Dapp Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // accoutn info
  const [account, setAccount] = useState('');

  // web3Modal configuration for wallet access
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: 'your-infura-id',
          },
        },
      },
    });

    return web3Modal;
  }

  // uses web3 modal to connect to user's wallet
  const connect = async () => {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* <ModalProvider /> */}
        <nav className='nav'>
          <div className={'header'}>
            <Link href={'/'}>
              <a>
                <Image
                  src={'assets/logo.svg'}
                  alt='App logo'
                  style={{ width: '50px' }}
                />
              </a>
            </Link>
            <Link href={'/'}>
              <a>
                <div className={'titleContainer'}>
                  <h2 className={'title'}>Full Stack</h2>
                  <p className={'description'}>Web3</p>
                </div>
              </a>
            </Link>
            {!account && (
              <div className={'buttonContainer'}>
                <button className={'buttonStyle'} onClick={connect}>
                  Connect
                </button>
              </div>
            )}
            {account && <p className={'accountInfo'}>{account}</p>}
          </div>
          <div className={'linkContainer'}>
            <Link href={'/'}>
              <a className={'link'}>Home</a>
            </Link>

            {
              /* allow createPost if user is contract owner */
              account === ownerAddress && (
                <Link href={'/create-post'}>
                  <a className={'link'}>Create Post</a>
                </Link>
              )
            }
          </div>
        </nav>
        <div className={'container'}>
          <AccountContext.Provider value={account}>
            {children}
          </AccountContext.Provider>
        </div>
      </body>
    </html>
  );
}
