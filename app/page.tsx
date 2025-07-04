import HomePosts from '@/components/home/HomePosts';
import { calGetAllPosts, calSortTimePosts } from '@/utils/dataset';

export default async function Home() {
  const allPosts = await calGetAllPosts();
  const sortAllPosts = calSortTimePosts(allPosts);

  const recentPosts = sortAllPosts.slice(0, 3);
  const changesImagesPosts = recentPosts.map((info, idx) => ({
    ...info,
    image: `/images/home/${idx + 1}.webp`,
  }));

  return (
    <div className="flex flex-col">
      <h1 className="font-caveat mb-4">
        <span className="font-arita">경훈</span> ﹒ JerryChu
      </h1>
      <div className="text-secondary mb-8">
        <p className="font-arita">
          화려하기보다는 직관적인 UI, 복잡하기보다는 이해하기 쉬운 코드를
          지향합니다.
        </p>
        <p className="font-arita">
          개발하면서 배운 것들을 기록하고, 가끔은 일상의 경험도 함께 기록합니다.
          꾸준히 배우고 천천히 나아가는 중입니다.
        </p>
      </div>
      <h2 className="font-caveat mb-4 text-3xl">Recent Post</h2>
      <HomePosts changesImagesPosts={changesImagesPosts} />
    </div>
  );
}
