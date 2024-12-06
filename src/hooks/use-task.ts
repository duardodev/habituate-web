import { toggleTask, updateTask } from '@/app/actions';
import { useState } from 'react';

interface useTaskProps {
  id: string;
  completed: boolean;
}

export function useTask({ id, completed }: useTaskProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  async function handleTaskToggle() {
    setIsCompleted(!isCompleted);

    try {
      await toggleTask(id);
    } catch (error) {
      setIsCompleted(isCompleted);
    }
  }

  function handleTaskTitleUpdate(newTitle: string) {
    updateTask(id, newTitle);
    setIsTitleEditing(false);
  }

  return {
    isCompleted,
    isTitleEditing,
    setIsTitleEditing,
    handleTaskToggle,
    handleTaskTitleUpdate,
  };
}
