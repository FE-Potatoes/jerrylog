import { ColorResult, TwitterPicker } from 'react-color';

import { ANIMAL_EMOJI_LIST } from '@/shared/constants/emoji';
import { cn } from '@/shared/lib/utils/cn';
import { useTheme } from 'next-themes';

export default function ColorEmojiPicker({
  wrapperRef,
  color,
  onChangeColor,
  onSelectEmoji,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  color: string;
  onChangeColor: (color: ColorResult) => void;
  onSelectEmoji: (emoji: string) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      ref={wrapperRef}
      className="absolute top-13 z-[100] shadow-2xl md:top-12"
    >
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
        className={cn('absolute h-11 w-[276px] rounded-b-md bg-white pb-2', {
          'bg-[#363636]': isDark,
        })}
      >
        <div className="custom-scrollbar mx-3 flex gap-2 overflow-x-scroll">
          {ANIMAL_EMOJI_LIST.map((item) => (
            <button
              key={item.name}
              aria-label={item.name}
              type="button"
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full text-2xl"
              onClick={() => onSelectEmoji(item.emoji)}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
