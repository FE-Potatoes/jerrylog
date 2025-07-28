import React from 'react';

interface EmojiProps {
  emojiValue: string;
  backgroundColor: string;
  onClickTogglePicker: () => void;
}

export const Emoji = React.memo(
  ({ emojiValue, backgroundColor, onClickTogglePicker }: EmojiProps) => {
    return (
      <button
        type="button"
        className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full text-2xl"
        style={{
          backgroundColor: backgroundColor,
        }}
        onClick={onClickTogglePicker}
      >
        {emojiValue}
      </button>
    );
  },
);

Emoji.displayName = 'Emoji';
