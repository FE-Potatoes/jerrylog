import { siteConfig } from '@/shared/constants/config';
import { PostCategory } from '@/shared/types/blogType';

type JsonLd = {
  title: string;
  date: string;
  summary: string;
  category: PostCategory;
  name: string;
};

export const calJsonLd = ({ title, date, summary, category, name }: JsonLd) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    datePublished: date,
    dateModified: date,
    description: summary ?? title,
    url: `${siteConfig.url}/blog/${category}/${name}`,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };
};
