'use client';

import React from 'react';

interface CommentItemProps {
  name: string;
  emoji: string;
  bgColor: string;
  content: string;
}

export const CommentItem = React.memo(function CommentItem({
  name,
  emoji,
  bgColor,
  content,
}: CommentItemProps) {
  return (
    <li className="bg-thirdary rounded-2xl p-5">
      <div className="mb-2 flex items-center gap-2">
        <div
          className="flex h-[32px] w-[32px] items-center justify-center rounded-[50%] text-xl leading-none"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <span className="relative -top-[1px]">{emoji}</span>
        </div>
        <span className="font-semibold">{name}</span>
      </div>
      <p className="whitespace-pre">{content}</p>
    </li>
  );
});
