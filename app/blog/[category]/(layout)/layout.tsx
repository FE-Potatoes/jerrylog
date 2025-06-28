import { siteConfig } from '@/constants/config';
import { PostCategory } from '@/types/blogType';
import { calGetPosts } from '@/utils/dataset';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: PostCategory }>;
}): Promise<Metadata> {
  const { category } = await params;
  const { title, desc } = calPostsInfo(category);
  const titleLabel = `JerryChu ${title}`;

  return {
    title: titleLabel,
    description: desc,
    openGraph: {
      title: titleLabel,
      url: `${siteConfig.url}/blog/${category}`,
      description: desc,
      images: [{ url: siteConfig.author.photo, alt: titleLabel }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [{ url: siteConfig.author.photo, alt: titleLabel }],
    },
  };
}

export const calPostsInfo = (category: PostCategory) => {
  if (category === 'dev')
    return {
      title: 'Dev Blog Posts',
      desc: '개발 관련 블로그 포스트 모음입니다. 다양한 기술과 경험을 공유합니다.',
    };

  return {
    title: 'Life Blog Posts',
    desc: '일상 관련 블로그 포스트 모음입니다. 일상의 경험을 공유합니다.',
  };
};

export default async function PostsLayout({
  params,
  children,
}: {
  params: Promise<{ category: PostCategory }>;
  children: React.ReactNode;
}) {
  const { category } = await params;

  const posts = await calGetPosts(category);
  const postsInfo = calPostsInfo(category);
  const { title, desc } = postsInfo;

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-3xl">
        {title} <span className="text-xl">({posts.length})</span>
      </h1>
      <p className="font-arita text-secondary mb-8">{desc}</p>
      {children}
    </div>
  );
}
