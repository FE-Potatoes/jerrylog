import { siteConfig } from '@/constants/config';
import { PostCategory } from '@/types/blogType';
import { calGetPosts } from '@/utils/dataset';
import { Metadata } from 'next';

const calPostsInfo = (category: PostCategory) => {
  if (category === 'dev')
    return {
      metaTitle: 'jerrychu (제리추) / 프론트엔드 개발 블로그 작성글',
      metaDesc: 'jerrychu 개발 관련 블로그 포스트 모음',
      title: 'Dev Blog Posts',
      desc: '개발 관련 블로그 포스트 모음입니다. 다양한 기술과 경험을 공유합니다.',
    };

  return {
    metaTitle: 'jerrychu (제리추) / 일상 블로그 작성글',
    metaDesc: 'jerrychu 일상 관련 블로그 포스트 모음',
    title: 'Life Blog Posts',
    desc: '일상 관련 블로그 포스트 모음입니다. 일상의 경험을 공유합니다.',
  };
};

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
