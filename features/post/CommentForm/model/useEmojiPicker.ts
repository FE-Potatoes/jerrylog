import { useCallback, useState } from 'react';
import { ColorResult } from 'react-color';

import { ANIMAL_EMOJI_LIST } from '@/shared/constants/emoji';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';

export function useEmojiPicker() {
  const { ref } = useOutsideClick<HTMLDivElement>(() =>
    setIsEmojiPicker(false),
  );

  const [emoji, setEmoji] = useState(ANIMAL_EMOJI_LIST[0].emoji);
  const [backgroundColor, setBackgroundColor] = useState(
    ANIMAL_EMOJI_LIST[0].bgColor,
  );
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);

  const onClickTogglePicker = useCallback(
    () => setIsEmojiPicker((prev) => !prev),
    [],
  );
  const onSelectEmoji = (emoji: string) => setEmoji(emoji);

  const onChangeColor = (color: ColorResult) => {
    setBackgroundColor(color.hex);
  };

  return {
    ref,
    emoji,
    isEmojiPicker,
    backgroundColor,
    onClickTogglePicker,
    onChangeColor,
    onSelectEmoji,
  };
}
