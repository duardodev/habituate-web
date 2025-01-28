'use client';

import EmojiPicker, { Emoji, Theme } from 'emoji-picker-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { updateHabitEmoji } from '@/app/actions';
import { useHabitContext } from '@/hooks/use-habit-context';

export function EmojiPickerButton() {
  const { id, emoji } = useHabitContext();
  const { resolvedTheme } = useTheme();
  const [unifiedCode, setUnifiedCode] = useState(emoji);

  function handleEmojiUpdate(emoji: string) {
    setUnifiedCode(emoji);
    updateHabitEmoji(id, emoji);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-[26px] w-[26px]">
          <Emoji unified={unifiedCode} size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-0 h-0 p-0">
        <EmojiPicker
          theme={resolvedTheme as Theme}
          lazyLoadEmojis={true}
          onEmojiClick={e => handleEmojiUpdate(e.unified)}
        />
      </PopoverContent>
    </Popover>
  );
}
