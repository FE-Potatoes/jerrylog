import { useState } from 'react';

import { ANIMAL_EMOJI_LIST } from '@/shared/constants/emoji';

export function useCommentName() {
  const [name, setName] = useState(ANIMAL_EMOJI_LIST[0].name);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  return {
    name,
    onChangeName,
  };
}
