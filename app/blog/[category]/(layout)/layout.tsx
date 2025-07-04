import { siteConfig } from '@/constants/config';
import { PostCategory } from '@/types/blogType';
import { calPostsInfo } from '@/utils/dataset';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: PostCategory }>;
}): Promise<Metadata> {
  const { category } = await params;
  const { metaTitle, metaDesc } = calPostsInfo(category);

  return {
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
