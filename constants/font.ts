import { Caveat } from 'next/font/google';
import localFont from 'next/font/local';

export const caveatFont = Caveat({
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
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
  preload: true,
});

export const pretendardFont = localFont({
  src: [
    {
      path: '../assets/fonts/PretendardGOV-Bold.woff2',
      weight: '700',
    },
    {
      path: '../assets/fonts/PretendardGOV-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../assets/fonts/PretendardGOV-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/PretendardGOV-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/PretendardGOV-Light.woff2',
      weight: '300',
    },
  ],
  variable: '--font-pretandard',
  display: 'swap',
  preload: true,
});
