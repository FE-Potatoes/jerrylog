'use client';

import { useCallback, useRef } from 'react';

import { sendCommentEmail } from '@/features/post/CommentForm/apis/commentActions';
import {
  useCommentButton,
  useCommentName,
  useEmojiPicker,
} from '@/features/post/CommentForm/model';
import { cn } from '@/shared/lib/utils/cn';
import { PostCategory } from '@/shared/types/blogType';
import FocusTrap from '@/shared/ui/FocusTrap';

import { ColorEmojiPicker, CommentTextarea, Emoji, NameInput } from './';

export const CommentForm = ({
  name: postName,
  category,
}: {
  name: string;
  category: PostCategory;
}) => {
  // * 댓글 닉네임
  const { name, onChangeName } = useCommentName();

  // * 댓글 이모지
  const {
    ref,
    emoji,
    isEmojiPicker,
    backgroundColor,
    onClickTogglePicker,
    onChangeColor,
    onSelectEmoji,
  } = useEmojiPicker();

  // * 댓글 버튼
  const {
    isPending,
    isDisabledButton,
    setIsDisabledSubmit,
    onClickRandomNickname,
    onSubmitComment,
  } = useCommentButton();

  // * 댓글 내용
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onChangeCommentTextarea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      if (textareaRef.current) textareaRef.current.value = value;
      setIsDisabledSubmit(!value || !name);
    },
    [name, setIsDisabledSubmit],
  );

  // * 댓글 등록 함수
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name,
      emoji,
      bg_color: backgroundColor,
      content: textareaRef.current!.value,
      post_slug: postName,
    };

    onSubmitComment(e, body, category, () => {
      sendCommentEmail({
        postname: postName,
        category,
        content: textareaRef.current!.value,
      });
      textareaRef.current!.value = '';
    });
  };

  return (
    <form className="font-notosans flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="relative grid gap-2 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-[10px] text-sm">
            <Emoji
              emojiValue={emoji}
              backgroundColor={backgroundColor}
              onClickTogglePicker={onClickTogglePicker}
            />
            <NameInput
              value={name}
              placeholder="닉네임 입력해주세요"
              maxLength={10}
              onChangeName={onChangeName}
            />
          </div>
          {isEmojiPicker && (
            <FocusTrap
              className="absolute top-13 z-[100] md:top-12"
              isActive={isEmojiPicker}
              isAutoFocus={true}
            >
              <ColorEmojiPicker
                wrapperRef={ref}
                color={backgroundColor}
                onClickTogglePicker={onClickTogglePicker}
                onChangeColor={onChangeColor}
                onSelectEmoji={onSelectEmoji}
              />
            </FocusTrap>
          )}
          <button
            aria-label="랜덤 닉네임 및 이모지 변경"
            type="button"
            className="bg-thirdary w-full items-center justify-center rounded-sm px-[12px] py-[7px] align-middle text-xs text-nowrap"
            onClick={() =>
              onClickRandomNickname({
                onChangeName,
                onSelectEmoji,
                onChangeColor,
              })
            }
          >
            랜덤 변경
          </button>
        </div>
        <CommentTextarea
          textareaRef={textareaRef}
          handleTextareaChange={onChangeCommentTextarea}
        />
      </div>
      <button
        type="submit"
        className={cn(
          'ml-auto inline-flex w-[120px] items-center justify-center rounded-sm bg-blue-500 px-[12px] py-[7px] text-xs text-gray-50',
          isDisabledButton && 'cursor-not-allowed bg-blue-300',
        )}
        disabled={isDisabledButton}
      >
        {isPending ? '로딩중...' : '댓글 남기기'}
      </button>
    </form>
  );
};
