import { ResCommentItem } from '@/features/post/CommentForm/apis/commentActions';
import { CommentItem } from '@/features/post/CommentItem';

export const CommentList = ({
  commentList,
}: {
  commentList: ResCommentItem[];
}) => {
  return (
    <ul className="font-notosans mt-2 flex flex-col gap-4 text-xs">
      {commentList.map((item) => (
        <CommentItem
          key={item.id}
          name={item.name}
          emoji={item.emoji}
          bgColor={item.bg_color}
          content={item.content}
        />
      ))}
    </ul>
  );
};
