// calTagPosts.test.ts
import { calTagPosts } from '@/shared/lib/utils/dataset';
import { PostCategory, PostMeta } from '@/shared/types/blogType';
import { describe, expect, it } from 'vitest';

export const mockPosts: PostMeta[] = [
  {
    author: 'Alice',
    category: PostCategory.Dev,
    date: '2025-01-01',
    description: 'React와 Next.js를 다룬 글',
    image: '/images/post1.png',
    name: 'post-1',
    title: 'React & Next.js 시작하기',
    tags: ['react', 'nextjs', 'typescript'],
  },
  {
    author: 'Bob',
    category: PostCategory.Life,
    date: '2025-01-05',
    description: '리액트 훅에 대한 글',
    image: '/images/post2.png',
    name: 'post-2',
    title: 'React Hooks 완벽 가이드',
    tags: ['react'],
  },
  {
    author: 'Charlie',
    category: PostCategory.Dev,
    date: '2025-02-01',
    description: 'Next.js 서버 기능을 다룬 글',
    image: '/images/post3.png',
    name: 'post-3',
    title: 'Next.js API Routes',
    tags: ['nextjs', 'node'],
  },
  {
    author: 'Dana',
    category: PostCategory.Life,
    date: '2025-02-15',
    description: '태그가 없는 글',
    image: '/images/post4.png',
    name: 'post-4',
    title: '태그 없는 포스트',
    tags: [],
  },
];

describe('calTagPosts 함수', () => {
  it('"all" 키에 모든 게시물이 포함되어야 한다', () => {
    const result = calTagPosts(mockPosts);
    expect(result.all).toHaveLength(4);
    expect(result.all).toEqual(mockPosts);
  });

  it('각 게시물이 첫 두 개 태그별로 그룹화되어야 한다', () => {
    const result = calTagPosts(mockPosts);

    // Post 1 -> react, nextjs
    expect(result.react).toContainEqual(mockPosts[0]);
    expect(result.nextjs).toContainEqual(mockPosts[0]);

    // Post 2 -> react만
    expect(result.react).toContainEqual(mockPosts[1]);

    // Post 3 -> nextjs, node
    expect(result.nextjs).toContainEqual(mockPosts[2]);
    expect(result.node).toContainEqual(mockPosts[2]);
  });

  it('첫 두 개 태그를 넘어선 태그는 포함되지 않아야 한다', () => {
    const result = calTagPosts(mockPosts);

    // Post 1의 "typescript"는 3번째 태그 → 포함되지 않아야 함
    expect(result.typescript).toBeUndefined();
  });

  it('태그가 없는 게시물도 처리할 수 있어야 한다', () => {
    const result = calTagPosts(mockPosts);

    // Post 4는 태그 없음 → "all"에만 존재해야 함
    expect(result.all).toContainEqual(mockPosts[3]);
    expect(Object.keys(result)).not.toContain(''); // 빈 키가 없어야 함
  });
});
