// useCommentForm.ts
import { useRef, useState } from 'react';
import { ColorResult } from 'react-color';

import { ANIMAL_EMOJI_LIST } from '@/shared/constants/emoji';

export const useCommentForm = () => {
  const [inputState, setInputState] = useState({
    nickname: ANIMAL_EMOJI_LIST[0].name,
    emoji: ANIMAL_EMOJI_LIST[0].emoji,
    bgColor: ANIMAL_EMOJI_LIST[0].bgColor,
  });
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeColor = (color: ColorResult) => {
    setInputState((prev) => ({ ...prev, bgColor: color.hex }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
    setIsDisabledSubmit(!value || !textareaRef.current?.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (textareaRef.current) textareaRef.current.value = value;
    setIsDisabledSubmit(!value || !inputState.nickname);
  };

  const handleRandomNickname = () => {
    const randomNickname =
      ANIMAL_EMOJI_LIST[Math.floor(Math.random() * ANIMAL_EMOJI_LIST.length)];
    setInputState({
      nickname: randomNickname.name,
      emoji: randomNickname.emoji,
      bgColor: randomNickname.bgColor,
    });
    setIsDisabledSubmit(!textareaRef.current!.value);
  };

  return {
    inputState,
    textareaRef,
    isDisabledSubmit,
    handleChangeColor,
    handleInputChange,
    handleTextareaChange,
    handleRandomNickname,
    setIsDisabledSubmit,
  };
};
