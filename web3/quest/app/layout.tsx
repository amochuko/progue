import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
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
  return (
   
    <html lang='en'>
      <body className={inter.className}>
        {/* <ModalProvider /> */}
        {children}
      </body>
    </html>
 
  );
}
