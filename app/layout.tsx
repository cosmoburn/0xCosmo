import '@/styles/globals.css';

import type { Metadata } from 'next';
// import { Open_Sans } from 'next/font/google';
import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({ subsets: ['latin'], display: 'swap' });
// const comfortaa = Montserrat({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Cosmo',
  description: 'Creative Developer & Designer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={comfortaa.className}>
      <body>{children}</body>
    </html>
  );
}
