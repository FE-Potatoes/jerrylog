'use client';

import { useRef } from 'react';

import { useCommentButton } from '@/features/post/CommentForm/model/useCommentButton';
import { useCommentName } from '@/features/post/CommentForm/model/useCommentName';
import { useEmojiPicker } from '@/features/post/CommentForm/model/useEmojiPicker';
import { cn } from '@/shared/lib/utils/cn';
import { PostCategory } from '@/shared/types/blogType';

import ColorEmojiPicker from './ColorEmojiPicker';
import CommentTextarea from './CommentTextarea';
import Emoji from './Emoji';
import NameInput from './NameInput';

export const CommentForm = ({
  name: postName,
  category,
}: {
  name: string;
  category: PostCategory;
}) => {
  // * 댓글 닉네임
  const { name, onChangeName } = useCommentName();

  // * 댓글 내용
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onChangeCommentTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    if (textareaRef.current) textareaRef.current.value = value;
    setIsDisabledSubmit(!value || !name);
  };

  // * 댓글 이모지
  const {
    ref,
    emoji,
    isEmojiPicker,
    backgroundColor,
    onClickOpenPicker,
    onChangeColor,
    onSelectEmoji,
  } = useEmojiPicker();

  // * 댓글 버튼
  const {
    isDisabledSubmit,
    setIsDisabledSubmit,
    onClickRandomNickname,
    handleCommentSubmit,
  } = useCommentButton();

  // * 댓글 등록 함수
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name,
      emoji,
      bg_color: backgroundColor,
      content: textareaRef.current!.value,
      post_slug: postName,
    };

    await handleCommentSubmit(e, body, category).then(() => {
      textareaRef.current!.value = '';
    });
  };

  return (
    <form className="font-notosans flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="grid gap-2 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center gap-[10px] text-sm">
            <Emoji
              emojiValue={emoji}
              backgroundColor={backgroundColor}
              onClickOpenPicker={onClickOpenPicker}
            />
            <NameInput
              value={name}
              placeholder="닉네임 입력해주세요"
              maxLength={10}
              onChangeName={onChangeName}
            />
            {isEmojiPicker && (
              <ColorEmojiPicker
                wrapperRef={ref}
                color={backgroundColor}
                onChangeColor={onChangeColor}
                onSelectEmoji={onSelectEmoji}
              />
            )}
          </div>
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
        aria-disabled={isDisabledSubmit}
        type="submit"
        className={cn(
          'ml-auto inline-flex w-[120px] items-center justify-center rounded-sm bg-blue-500 px-[12px] py-[7px] text-xs text-gray-50',
          isDisabledSubmit && 'bg-blue-300',
        )}
        disabled={isDisabledSubmit}
      >
        댓글 남기기
      </button>
    </form>
  );
};
