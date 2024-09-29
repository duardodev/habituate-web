'use client';

import { Input } from '@/components/ui/input';
import { useHabitTitleInput } from '@/hooks/use-habit-title-input';

interface HabitTitleInputProps {
  title: string;
  onTitleSave: (newTitle: string) => void;
}

export function HabitTitleInput({ title, onTitleSave }: HabitTitleInputProps) {
  const { handleTitleChange, saveTitle, temporaryTitle } = useHabitTitleInput({
    title,
    onTitleSave,
  });

  return (
    <Input
      type="text"
      value={temporaryTitle}
      className="h-7 py-3 text-base focus-visible:ring-transparent"
      onChange={handleTitleChange}
      onBlur={saveTitle}
      autoFocus={process.env.NODE_ENV === 'production'}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          saveTitle();
        }
      }}
    />
  );
}
