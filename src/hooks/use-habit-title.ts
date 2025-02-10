import { useState } from 'react';
import { deleteHabit, updateHabitTitle } from '@/app/actions';
import { useQueryClient } from '@tanstack/react-query';
import { useHabitContext } from './use-habit-context';

export function useHabitTitle() {
  const { id } = useHabitContext();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const queryClient = useQueryClient();

  function handleHabitTitleUpdate(newTitle: string) {
    updateHabitTitle(id, newTitle);
    setIsTitleEditing(false);
  }

  async function handleRemoveHabit() {
    await deleteHabit(id);
    queryClient.invalidateQueries({ queryKey: ['get-habits'] });
  }

  const startEditing = () => setIsTitleEditing(true);

  return {
    isTitleEditing,
    handleHabitTitleUpdate,
    handleRemoveHabit,
    startEditing,
  };
}
