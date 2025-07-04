import { PostCategory, PostMeta } from '@/types/blogType';
import { readdir } from 'fs/promises';
import path from 'path';

/**
 * 게시물 목록을 받아 태그별로 그룹화한 객체를 반환합니다.
 * - 각 게시물의 상위 2개 태그만 사용합니다.
 * - 'all' 키에는 전체 게시물을 저장합니다.
 *
 * @param sortPosts 정렬된 게시물 배열
 * @returns 태그별로 분류된 게시물 객체 (예: { react: [...], nextjs: [...], all: [...] })
 */
export const calTagPosts = (sortPosts: PostMeta[]) => {
  const filterPosts = sortPosts.reduce(
    (acc: { [key: string]: PostMeta[] }, cur) => {
      const { tags } = cur;
      const sliceTags = tags.slice(0, 2);

      for (const tag of sliceTags) {
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(cur);
      }

      return acc;
    },
    { all: sortPosts },
  );
  return filterPosts;
};

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
