import BlogIntroduce from '@/components/blog/BlogIntroduce';
import BlogPosts from '@/components/blog/BlogPosts';
import { PostCategory } from '@/types/blogType';
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

export default async function page({
  params,
}: {
  params: Promise<{ category: PostCategory }>;
}) {
  const { category } = await params;
  const posts = await calGetPosts(category);
  const sortPosts = calSortTimePosts(posts);

  const postsInfo = calPostsInfo(category);
  const { title, desc } = postsInfo;

  return (
    <div className="flex flex-col">
      <BlogIntroduce title={title} desc={desc} postLength={posts.length} />
      {/* <BlogSearch /> */}
      <BlogPosts sortPosts={sortPosts} />
    </div>
  );
}
