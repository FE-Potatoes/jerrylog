import Post, { PostProps } from '@/components/home/Post';
import PostsLayout from '@/components/layout/PostsLayout';

const posts: PostProps[] = [
  {
    name: '1.mdx',
    title: '컴포넌트 Lazy Loading, prefetch로 최적화하기',
    date: '2025.05.11',
    imageSrc: '/images/home/1.webp',
    category: 'dev',
  },
  {
    name: '2.mdx',
    title: '컴포넌트 Lazy',
    date: '2025.05.11',
    imageSrc: '/images/home/2.webp',
    category: 'life',
  },
  {
    name: '3.mdx',
    title: '컴포넌트 Loading, prefetch로 최적화하기',
    date: '2025.05.11',
    imageSrc: '/images/home/3.webp',
    category: 'dev',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4">경훈 ﹒ JerryChu</h1>
      <div className="font-arita mb-8">
        <p>
          화려하기보다는 직관적인 UI, 복잡하기보다는 이해하기 쉬운 코드를
          지향합니다.
        </p>
        <p>
          개발하면서 배운 것들을 기록하고, 가끔은 일상의 경험도 함께 기록합니다.
          꾸준히 배우고 천천히 나아가는 중입니다.
        </p>
      </div>
      <h2 className="font-caveat mb-4 text-3xl">Recent Post</h2>
      <PostsLayout>
        {posts.map((item) => {
          const { name, title, date, imageSrc, category } = item;
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
    </div>
  );
}
