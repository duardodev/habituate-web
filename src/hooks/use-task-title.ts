import { useTaskTitleStore } from '@/store/use-task-title-store';
import { useTaskContext } from './use-task-context';
import { useTasksStore } from '@/store/use-tasks-store';

export function useTaskTitle() {
  const { id } = useTaskContext();
  const { setIsTitleEditing } = useTaskTitleStore();
  const updateTaskTitle = useTasksStore(state => state.updateTaskTitle);

  function handleTaskTitleUpdate(newTitle: string) {
    updateTaskTitle(id, newTitle);
    setIsTitleEditing();
  }

  return {
    handleTaskTitleUpdate,
  };
}
