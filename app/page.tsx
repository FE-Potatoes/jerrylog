import Post, { PostProps } from '@/components/home/Post';
import Image from 'next/image';

const posts: PostProps[] = [
  {
    title: '컴포넌트 Lazy Loading, prefetch로 최적화하기',
    date: '2025.05.11',
    imageSrc: '/images/1.webp',
    category: 'dev',
  },
  {
    title: '컴포넌트 Lazy',
    date: '2025.05.11',
    imageSrc: '/images/2.webp',
    category: 'life',
  },
  {
    title: '컴포넌트 Loading, prefetch로 최적화하기',
    date: '2025.05.11',
    imageSrc: '/images/3.webp',
    category: 'dev',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="text-heading font-caveat mb-4 text-2xl leading-7">
        경훈 ﹒ JerryChu
      </h1>
      <div className="font-arita text-secondary mb-8">
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
      <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
        {posts.map((item) => {
          const { title, date, imageSrc, category } = item;
          return (
            <Post
              key={title}
              title={title}
              date={date}
              imageSrc={imageSrc}
              category={category}
            />
          );
        })}
      </div>
    </div>
  );
}
