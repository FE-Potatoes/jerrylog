import BlogPosts from '@/components/blog/BlogPosts';
import { PostCategory } from '@/types/blogType';
import { calGetPosts, calSortTimePosts } from '@/utils/dataset';

export default async function page({
  params,
}: {
  params: Promise<{ category: PostCategory }>;
}) {
  const { category } = await params;
  const posts = await calGetPosts(category);
  const sortPosts = calSortTimePosts(posts);

  return <BlogPosts sortPosts={sortPosts} />;
}
