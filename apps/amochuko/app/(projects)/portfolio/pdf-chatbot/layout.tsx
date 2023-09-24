import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDF Chatbot',
  description: 'Generate a chatbot from a PDF',
};

export default function PDFLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
