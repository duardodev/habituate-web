'use client';

import Image from 'next/image';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEmojiPickerButton } from '@/hooks/use-emoji-picker-button';

export function EmojiPickerButton() {
  const { handleEmojiUpdate, emojiUrl } = useEmojiPickerButton();
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-[26px] w-[26px]">
          <Image
            src={emojiUrl}
            quality={100}
            height={20}
            width={20}
            alt="Emoji do hábito"
            className="h-5 w-5"
            priority
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-0 h-0 p-0">
        <EmojiPicker
          theme={resolvedTheme as Theme}
          lazyLoadEmojis={true}
          autoFocusSearch={false}
          onEmojiClick={e => handleEmojiUpdate(e.imageUrl)}
        />
      </PopoverContent>
    </Popover>
  );
}
