import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const ptSansNarrow = localFont({
  src: [
    {
      path: '../public/fonts/PTSans-Narrow.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PTSans-NarrowBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pt-sans-narrow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'sandwor',
  description: 'Веб-разработчик Александр Воробьев',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${ptSansNarrow.variable} antialiased`}>{children}</body>
    </html>
  );
}
