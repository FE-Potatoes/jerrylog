import { BlogIntroduce, BlogPosts, BlogTags } from '@/features/blog';
import { siteConfig } from '@/shared/constants/config';
import {
  calGetPosts,
  calPostsInfo,
  calSortTimePosts,
  calTagPosts,
} from '@/shared/lib/utils/dataset';
import { PostCategory } from '@/shared/types/blogType';
import { Metadata } from 'next';

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

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ category: PostCategory }>;
  searchParams: Promise<{ tag?: string }>;
}) {
  const { category } = await params;
  const { tag } = await searchParams;

  const posts = await calGetPosts(category);
  const sortPosts = calSortTimePosts(posts);

  const tagPosts = calTagPosts(sortPosts);
  const filterPosts = tag ? tagPosts[tag] : sortPosts;

  const postsInfo = calPostsInfo(category);
  const { title, desc } = postsInfo;

  return (
    <div className="flex flex-col">
      <BlogIntroduce title={title} desc={desc} postLength={posts.length} />
      <BlogTags category={category} tagPosts={tagPosts} />
      <BlogPosts posts={filterPosts} />
    </div>
  );
}
