import { siteConfig } from '@/constants/config';
import { PostCategory } from '@/types/blogType';
import { calGetPosts } from '@/utils/dataset';
import { Metadata } from 'next';

const calPostsInfo = (category: PostCategory) => {
  if (category === 'dev')
    return {
      title: 'jerrychu (제리추) / 프론트엔드 개발 블로그 작성글',
      desc: 'jerrychu 개발 관련 블로그 포스트 모음',
    };

  return {
    title: 'jerrychu (제리추) / 일상 블로그 작성글',
    desc: 'jerrychu 일상 관련 블로그 포스트 모음',
  };
};

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
