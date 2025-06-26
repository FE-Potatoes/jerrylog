import BlogPosts from '@/components/blog/BlogPosts';
import { calGetPosts, calSortTimePosts } from '@/constants/dataset';

export default async function page({
  params,
}: {
  params: Promise<{ category: 'dev' | 'life' }>;
}) {
  const { category } = await params;
  const posts = await calGetPosts(category);
  const sortPosts = calSortTimePosts(posts);

  return <BlogPosts sortPosts={sortPosts} />;
}
