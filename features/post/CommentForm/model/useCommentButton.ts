import { useState, useTransition } from 'react';
import { ColorResult } from 'react-color';

import {
  CommentBody,
  postComment,
} from '@/features/post/CommentForm/apis/commentActions';
import { ANIMAL_EMOJI_LIST } from '@/shared/constants/emoji';
import { PostCategory } from '@/shared/types/blogType';

interface UseCommentButtonProps {
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectEmoji: (emoji: string) => void;
  onChangeColor: (color: ColorResult) => void;
}

export function useCommentButton() {
  // * 랜덤 닉네임 및 이모지 변경
  const onClickRandomNickname = ({
    onChangeName,
    onSelectEmoji,
    onChangeColor,
  }: UseCommentButtonProps) => {
    const randomNickname =
      ANIMAL_EMOJI_LIST[Math.floor(Math.random() * ANIMAL_EMOJI_LIST.length)];
    onChangeName({
      target: {
        value: randomNickname.name,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    onSelectEmoji(randomNickname.emoji);
    onChangeColor({ hex: randomNickname.bgColor } as ColorResult);
  };

  // * 댓글 등록 함수
  const [isPending, startTransition] = useTransition();
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);

  const isDisabledButton = isPending || isDisabledSubmit;

  const onSubmitComment = (
    e: React.FormEvent<HTMLFormElement>,
    body: CommentBody,
    category: PostCategory,
    onSuccess?: () => void,
    onError?: (error: Error) => void,
  ) => {
    e.preventDefault();

    startTransition(() => {
      postComment(body, category)
        .then(() => {
          onSuccess?.();
        })
        .catch((error) => {
          console.error('댓글 등록 실패:', error);
          onError?.(error);
        });
    });
  };

  return {
    isPending,
    isDisabledButton,
    setIsDisabledSubmit,
    onClickRandomNickname,
    onSubmitComment,
  };
}
