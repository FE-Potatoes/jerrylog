import { use } from 'react';

import { PostCategory } from '@/shared/types/blogType';

import { CommentHeader, CommentList } from '.';
import { getCommentList } from './CommentForm/apis/commentActions';
import { CommentForm } from './CommentForm/ui/CommentForm';

export const dynamic = 'force-dynamic';

export function CommentContainer({
  name,
  category,
}: {
  name: string;
  category: PostCategory;
}) {
  const { data } = use(getCommentList(name));
  const commentLength = data.length;

  return (
    <div className="flex flex-col gap-4">
      <CommentHeader commentLength={commentLength} />
      <CommentForm name={name} category={category} />
      <CommentList commentList={data} />
    </div>
  );
}
