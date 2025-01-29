'use client';

import EmojiPicker, { Emoji, Theme } from 'emoji-picker-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEmojiPickerButton } from '@/hooks/use-emoji-picker-button';

export function EmojiPickerButton() {
  const { handleEmojiUpdate, unifiedCode } = useEmojiPickerButton();
  const { resolvedTheme } = useTheme();

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
