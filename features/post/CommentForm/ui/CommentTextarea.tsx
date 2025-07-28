import React from 'react';

interface CommentTextareaProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CommentTextarea = React.memo(
  ({ textareaRef, handleTextareaChange }: CommentTextareaProps) => {
    return (
      <>
        <label
          htmlFor="comment"
          aria-describedby="comment-desc"
          className="sr-only"
        >
          주제와 무관한 댓글, 악플은 삭제될 수 있습니다.
        </label>
        <textarea
          required
          aria-describedby="comment-desc"
          id="comment"
          name="comment"
          ref={textareaRef}
          className="border-thirdary h-24 w-full resize-none rounded-md border-1 px-4 py-3 text-xs md:h-full"
          placeholder="주제와 무관한 댓글, 악플은 삭제될 수 있습니다."
          onChange={handleTextareaChange}
        />
      </>
    );
  },
);

CommentTextarea.displayName = 'CommentTextarea';
