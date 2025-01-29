import { useEffect, useState } from 'react';
import { updateHabitEmoji } from '@/app/actions';
import { useHabitContext } from './use-habit-context';

export function useEmojiPickerButton() {
  const { id, emoji } = useHabitContext();
  const [unifiedCode, setUnifiedCode] = useState(emoji);

  useEffect(() => {
    setUnifiedCode(emoji);
  }, []);

  function handleEmojiUpdate(emoji: string) {
    setUnifiedCode(emoji);
    updateHabitEmoji(id, emoji);
  }

  return {
    unifiedCode,
    handleEmojiUpdate,
  };
}
