import { useState } from 'react';
import { updateHabit } from '@/app/actions';

interface useHabitProps {
  id: string;
}

export function useHabit({ id }: useHabitProps) {
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const handleHabitTitleUpdate = (newTitle: string) => {
    updateHabit(id, newTitle);
    setIsTitleEditing(false);
  };

  const startEditing = () => setIsTitleEditing(true);

  return {
    isTitleEditing,
    handleHabitTitleUpdate,
    startEditing,
  };
}
