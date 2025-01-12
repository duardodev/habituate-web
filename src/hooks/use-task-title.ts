import { useTaskContext } from './use-task-context';
import { useTasksStore } from '@/store/tasks-store';
import { useActiveTaskEditingContext } from './use-active-task-editing';

export function useTaskTitle() {
  const { id } = useTaskContext();
  const { handleToggleTaskEditing, activeTaskEditingId } = useActiveTaskEditingContext();
  const updateTaskTitle = useTasksStore(state => state.updateTaskTitle);
  const isTitleEditing = activeTaskEditingId === id;

  function handleTaskTitleUpdate(newTitle: string) {
    updateTaskTitle(id, newTitle);
    handleToggleTaskEditing(id);
  }

  return {
    handleTaskTitleUpdate,
    isTitleEditing,
  };
}
