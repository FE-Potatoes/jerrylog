import { useState } from 'react';
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
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

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
  const handleCommentSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    body: CommentBody,
    category: PostCategory,
  ) => {
    e.preventDefault();

    try {
      await postComment(body, category);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabledSubmit(true);
    }
  };

  return {
    isDisabledSubmit,
    setIsDisabledSubmit,
    onClickRandomNickname,
    handleCommentSubmit,
  };
}
