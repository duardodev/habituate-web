import { useState } from 'react';
import { updateHabitEmoji } from '@/app/actions/habit-actions';
import { useHabitContext } from './use-habit-context';
import { toast } from 'sonner';

export function useEmojiPickerButton() {
  const { id, emoji } = useHabitContext();
  const [emojiUrl, setEmojiUrl] = useState(emoji);

  async function handleEmojiUpdate(newEmoji: string) {
    setEmojiUrl(newEmoji);

    const response = await updateHabitEmoji(id, newEmoji);

    if (!response.success) {
      setEmojiUrl(emoji);
      toast.error(response.error);
      return;
    }
  }

  return {
    emojiUrl,
    handleEmojiUpdate,
  };
}
