import BlogIntroduce from '@/components/blog/BlogIntroduce';
import BlogPosts from '@/components/blog/BlogPosts';
import BlogTags from '@/components/blog/BlogTags';
import { PostCategory, PostMeta } from '@/types/blogType';
import { calGetPosts, calSortTimePosts } from '@/utils/dataset';

export const calPostsInfo = (category: PostCategory) => {
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

const calTagPosts = (sortPosts: PostMeta[]) => {
  const filterPosts = sortPosts.reduce(
    (acc: { [key: string]: PostMeta[] }, cur) => {
      const { tags } = cur;
      const sliceTags = tags.slice(0, 2);

      for (const tag of sliceTags) {
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(cur);
      }

      return acc;
    },
    { all: sortPosts },
  );
  return filterPosts;
};

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
