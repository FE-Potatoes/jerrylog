import { readdir } from 'fs/promises';
import path from 'path';

export async function getPosts(type: 'dev' | 'life') {
  // 파일 경로 찾기
  const postPath = path.resolve(process.cwd(), 'public', 'blog', `${type}`);
  const fileList = await readdir(postPath, { withFileTypes: true });

  // 파일 목록에서 메타데이터 추출 후 가공
  const posts = await Promise.all(
    fileList.map(async ({ name }) => {
      const { metadata } = await import(`@/public/blog/${type}/${name}`);
      return { name, ...metadata };
    }),
  );

  // 최신 날짜 기준으로 정렬
  const sortTimePost = posts.sort(
    (a, b) => new Date(b.date).getTime() - +new Date(a.date).getTime(),
  );

  return sortTimePost;
}
