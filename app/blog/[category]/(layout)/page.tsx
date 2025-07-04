import BlogIntroduce from '@/components/blog/BlogIntroduce';
import BlogPosts from '@/components/blog/BlogPosts';
import BlogTags from '@/components/blog/BlogTags';
import { PostCategory, PostMeta } from '@/types/blogType';
import {
  calGetPosts,
  calPostsInfo,
  calSortTimePosts,
  calTagPosts,
} from '@/utils/dataset';

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
