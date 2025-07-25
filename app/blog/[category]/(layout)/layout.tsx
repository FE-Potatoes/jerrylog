import { siteConfig } from '@/shared/constants/config';
import { calPostsInfo } from '@/shared/lib/utils/dataset';
import { PostCategory } from '@/shared/types/blogType';
import { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: PostCategory }>;
}): Promise<Metadata> {
  const { category } = await params;
  const { metaTitle, metaDesc } = calPostsInfo(category);

  return {
    alternates: {
      canonical: `${siteConfig.url}/blog/${category}`,
      languages: {
        'ko-KR': `${siteConfig.url}/blog/${category}`,
      },
    },
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      url: `${siteConfig.url}/blog/${category}`,
      description: metaDesc,
      images: [{ url: siteConfig.author.photo, alt: metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [{ url: siteConfig.author.photo, alt: metaTitle }],
    },
  };
}

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
