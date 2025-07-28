import { useEffect } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';

import { ANIMAL_EMOJI_LIST } from '@/shared/constants/emoji';
import { cn } from '@/shared/lib/utils/cn';
import { useTheme } from 'next-themes';

interface ColorEmojiPickerProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  color: string;
  onClickTogglePicker: () => void;
  onChangeColor: (color: ColorResult) => void;
  onSelectEmoji: (emoji: string) => void;
}

export function ColorEmojiPicker({
  wrapperRef,
  color,
  onClickTogglePicker,
  onChangeColor,
  onSelectEmoji,
}: ColorEmojiPickerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClickTogglePicker();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClickTogglePicker]);

  return (
    <div ref={wrapperRef} aria-label="댓글 프로필 색상 및 이모지 선택">
      {/* Color picker */}
      <TwitterPicker
        color={color}
        onChange={onChangeColor}
        styles={{
          default: {
            card: {
              borderRadius: '4px 4px 0 0',
              boxShadow: 'none',
              backgroundColor: isDark ? '#363636' : 'white',
            },
            body: {
              paddingBottom: 0,
            },
            triangle: {
              borderColor: isDark
                ? 'transparent transparent #363636'
                : 'transparent transparent white',
            },
            input: {
              backgroundColor: isDark ? '#363636' : 'white',
              color: isDark ? '#f8f9fa' : 'rgb(152, 161, 164)',
              boxShadow: 'none',
              border: isDark
                ? '1px solid rgb(152, 161, 164)'
                : '1px solid #f0f0f0',
            },

            hash: {
              backgroundColor: isDark ? '#a3a3a3' : '#f0f0f0',
              color: isDark ? '#1e1e1e' : 'rgb(152, 161, 164)',
            },
          },
        }}
      />
      {/* emoji picker */}
      <div
        className={cn('absolute h-12 w-[276px] rounded-b-md bg-white', {
          'bg-[#363636]': isDark,
        })}
      >
        <ul
          className="custom-scrollbar mx-3 flex gap-1 overflow-x-scroll overflow-y-hidden p-1"
          role="list"
        >
          {ANIMAL_EMOJI_LIST.map((item) => (
            <li key={item.name}>
              <button
                aria-label={`댓글 프로필 ${item.name} 이모지로 변경`}
                type="button"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-none text-2xl focus-visible:outline-1"
                onClick={() => onSelectEmoji(item.emoji)}
              >
                {item.emoji}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
