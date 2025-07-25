import React from 'react';

interface EmojiProps {
  emojiValue: string;
  backgroundColor: string;
  onClickOpenPicker: () => void;
}

export default function Emoji({
  emojiValue,
  backgroundColor,
  onClickOpenPicker,
}: EmojiProps) {
  return (
    <div
      className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full text-2xl"
      style={{
        backgroundColor: backgroundColor,
      }}
      onClick={onClickOpenPicker}
    >
      <div aria-label={`${emojiValue} 이모지`} className="-top-[1px]">
        {emojiValue}
      </div>
    </div>
  );
}
