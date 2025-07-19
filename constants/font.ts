import { Caveat, Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

export const caveatFont = Caveat({
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const notoSansFont = Noto_Sans_KR({
  variable: '--font-notosans',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const aritaFont = localFont({
  src: [
    {
      path: '../assets/fonts/Arita-buriL.woff2',
      weight: '300',
    },
    {
      path: '../assets/fonts/Arita-buriM.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/Arita-buriSB.woff2',
      weight: '600',
    },
    {
      path: '../assets/fonts/Arita-buriB.woff2',
      weight: '700',
    },
  ],
  variable: '--font-arita',
  display: 'swap',
});
