// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
import { Metadata } from 'next';

export const siteConfig = {
  url: 'https://www.jerrychu.me',
  title: 'jerrychu (제리추) 블로그',
  description:
    'jerrychu 프론트엔드 개발자의 블로그, 개발하며 배운 것들을 기록하고, 가끔은 일상의 경험도 함께 기록합니다.',
  copyright: 'jerrychu © All rights reserved.',
  since: 2025,
  googleAnalyticsId: '',
  generator: 'Next.js',
  applicationName: 'jerrychu (제리추) 블로그',
  author: {
    name: 'jerrychu',
    photo: 'https://avatars.githubusercontent.com/u/68219145?v=4',
    bio: 'Junior Frontend Engineer',
    contacts: {
      email: 'mailto:jerrychu1220@gmail.com',
      github: 'https://github.com/chuhoon',
      velog: 'https://velog.io/@jerrychu',
    },
  },
  menus: [
    {
      href: '/',
      label: '🏖️',
    },
    {
      href: '/',
      label: 'About',
    },
    {
      href: '/blog/dev',
      label: 'Dev',
    },
    {
      href: '/blog/life',
      label: 'Life',
    },
  ],
};

export const seoConfig: Metadata = {
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'ko-KR': siteConfig.url,
    },
  },
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: ['jerrychu', '개발 블로그', '일상 블로그', '블로그', 'blog'],
  verification: {
    google: 'YV2XiZ4p2B-EZQUYFMOORXahkH7uzy9A6vm6xZPP_t4',
    other: {
      'naver-site-verification': 'cd6fa7075e8d25586ca69d55a9b97c36db3600c6',
      'google-adsense-account': 'ca-pub-4761019594552611',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko-KR',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [{ url: siteConfig.author.photo, alt: siteConfig.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.author.photo, alt: siteConfig.title }],
  },
};
