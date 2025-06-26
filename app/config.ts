export const headerConfig = {};

export const siteConfig = {
  url: 'https://www.',
  title: 'jerrychu blog',
  description: '여행을 하며 기록하는 공간입니다.',
  copyright: 'jerrychu © All rights reserved.',
  since: 2025,
  googleAnalyticsId: '',
  author: {
    name: 'Jerry Chu',
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

export const seoConfig = {
  title: siteConfig.title,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: 'ko-KR',
    url: siteConfig.url,
    siteName: siteConfig.title,
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: siteConfig.author.name,
    },
  ],
};
