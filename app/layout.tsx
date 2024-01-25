import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Cosmo | Creative Developer',
  description: 'Creative Developer & Designer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={comfortaa.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
