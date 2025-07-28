import React from 'react';

import { siteConfig } from '@/shared/constants/config';
import { LinkExternal } from '@/shared/ui';

export function CommentHeader({ commentLength }: { commentLength: number }) {
  return (
    <div className="font-notosan flex items-start justify-between text-sm">
      <span>댓글 {commentLength}</span>
      <span>
        문의:
        <LinkExternal href={siteConfig.author.contacts.email}>
          {' '}
          jerrychu1220@gmail.com
        </LinkExternal>
      </span>
    </div>
  );
}
