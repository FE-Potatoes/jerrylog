import Post from '@/components/home/Post';
import BlogLayout from '@/components/layout/BlogLayout';
import PostsLayout from '@/components/layout/PostsLayout';
import { getPosts } from '@/constants/dataset';

const exampleData = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const date = new Date(2025, 0, 1 + i).toISOString().split('T')[0];
  return {
    title: `Sample Post #${id}`,
    date,
    imageSrc: `/images/home/1.webp`,
    category: Math.random() > 0.5 ? 'dev' : 'life',
  };
});

export default async function page() {
  const posts = await getPosts('dev');

  return (
    <BlogLayout
      title="Dev Blog Posts"
      description="개발 관련 블로그 포스트 모음입니다. 다양한 기술과 경험을 공유합니다."
      postLength={posts.length}
    >
      <PostsLayout>
        {posts.map((item) => {
          const { name, title, date, image: imageSrc, category } = item;

          return (
            <Post
              key={name}
              name={name}
              title={title}
              date={date}
              imageSrc={imageSrc}
              category={category}
            />
          );
        })}
      </PostsLayout>
    </BlogLayout>
  );
}
