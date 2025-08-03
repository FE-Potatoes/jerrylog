import { PostCategory } from '@/shared/types/blogType';

import { CommentHeader, CommentList } from '.';
import { getCommentList } from './CommentForm/apis/commentActions';
import { CommentForm } from './CommentForm/ui/CommentForm';

export async function CommentContainer({
  name,
  category,
}: {
  name: string;
  category: PostCategory;
}) {
  const { data } = await getCommentList(name);
  const commentLength = data.length;

  return (
    <div className="flex flex-col gap-4">
      <CommentHeader commentLength={commentLength} />
      <CommentForm name={name} category={category} />
      <CommentList commentList={data} />
    </div>
  );
}
