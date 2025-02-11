import { useState } from 'react';
import { deleteHabit, updateHabitTitle } from '@/app/actions/habit-actions';
import { useQueryClient } from '@tanstack/react-query';
import { useHabitContext } from './use-habit-context';
import { toast } from 'sonner';

export function useHabitTitle() {
  const { id } = useHabitContext();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const queryClient = useQueryClient();

  async function handleHabitTitleUpdate(newTitle: string) {
    setIsTitleEditing(false);

    const response = await updateHabitTitle(id, newTitle);

    if (!response.success) {
      toast.error(response.error);
      return;
    }

    toast.success('Habit successfully renamed!');
  }

  async function handleRemoveHabit() {
    const response = await deleteHabit(id);

    if (!response.success) {
      toast.error(response.error);
      return;
    }

    toast.success('Habit successfully removed!');
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
