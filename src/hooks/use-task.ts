import { useTasksStore } from '@/store/use-tasks-store';
import { useState } from 'react';

interface useTaskProps {
  id: string;
}

export function useTask({ id }: useTaskProps) {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const toggleTask = useTasksStore(state => state.toggleTask);
  const removeTask = useTasksStore(state => state.removeTask);
  const updateTaskTitle = useTasksStore(state => state.updateTaskTitle);

  function handleTaskToggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggleTask(id);
  }

  function handleTaskTitleUpdate(newTitle: string) {
    updateTaskTitle(id, newTitle);
    setIsTitleEditing(false);
  }

  return {
    isTitleEditing,
    setIsTitleEditing,
    handleTaskToggle,
    handleTaskTitleUpdate,
    removeTask,
  };
}
