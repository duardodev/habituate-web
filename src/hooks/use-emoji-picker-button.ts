import { useState } from 'react';
import { updateHabitEmoji } from '@/app/actions';
import { useHabitContext } from './use-habit-context';

export function useEmojiPickerButton() {
  const { id, emoji } = useHabitContext();
  const [emojiUrl, setEmojiUrl] = useState(emoji);

  function handleEmojiUpdate(newEmoji: string) {
    setEmojiUrl(newEmoji);
    updateHabitEmoji(id, newEmoji);
  }

  return {
    emojiUrl,
    handleEmojiUpdate,
  };
}
