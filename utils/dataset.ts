import { PostCategory, PostMeta } from '@/types/blogType';
import { readdir } from 'fs/promises';
import path from 'path';

// 최신 날짜 기준으로 정렬
export const calSortTimePosts = (posts: PostMeta[]) => {
  const sortTimePost = posts.sort(
    (a, b) => new Date(b.date).getTime() - +new Date(a.date).getTime(),
  );

  return sortTimePost;
};

// 특정 게시판 게시물 받기
export async function calGetPosts(type: PostCategory) {
  // 파일 경로 찾기
  const postPath = path.resolve(process.cwd(), 'public', 'blog', `${type}`);
  const fileList = await readdir(postPath, { withFileTypes: true });

  // 파일 목록에서 메타데이터 추출 후 가공
  const posts = await Promise.all(
    fileList.map(async ({ name }) => {
      const { metadata } = await import(`@/public/blog/${type}/${name}`);
      const transformName = name.replace('.mdx', '');

      return { ...metadata, name: transformName };
    }),
  );

  return posts;
}

// 모든 Post 반환
export async function calGetAllPosts() {
  const [devPosts, lifePosts] = await Promise.all([
    calGetPosts('dev'),
    calGetPosts('life'),
  ]);
  const allPosts = [...devPosts, ...lifePosts];
  return allPosts;
}
