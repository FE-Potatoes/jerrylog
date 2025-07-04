'use client';

import React from 'react';

import { PostCategory, PostMeta } from '@/types/blogType';
import { useRouter } from 'next/navigation';

import Tag from '../common/Tag';

interface BlogTagsProps {
  category: PostCategory;
  tagPosts: Record<string, PostMeta[]>;
}

export default function BlogTags({ category, tagPosts }: BlogTagsProps) {
  const router = useRouter();

  const handleTag = (tagName: string) => {
    router.push(`/blog/${category}?tag=${tagName}`);
  };

  return (
    <div className="custom-scrollbar mb-1 flex h-[1.8rem] w-full gap-1 overflow-x-auto whitespace-nowrap">
      {Object.keys(tagPosts).map((name) => (
        <Tag key={name} onclick={() => handleTag(name)}>
          {name === 'all'
            ? `전체보기 (${tagPosts[name].length})`
            : `${name} (${tagPosts[name].length})`}
        </Tag>
      ))}
    </div>
  );
}
