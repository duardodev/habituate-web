import { useTaskTitleStore } from '@/store/task-title-store';
import { useTaskContext } from './use-task-context';
import { useTasksStore } from '@/store/tasks-store';

export function useTaskTitle() {
  const { id } = useTaskContext();
  const toggleEditingTask = useTaskTitleStore(state => state.toggleEditingTask);
  const updateTaskTitle = useTasksStore(state => state.updateTaskTitle);

  const activeEditingTaskId = useTaskTitleStore(state => state.activeEditingTaskId);
  const isTitleEditing = activeEditingTaskId === id;

  function handleTaskTitleUpdate(newTitle: string) {
    updateTaskTitle(id, newTitle);
    toggleEditingTask(id);
  }

  return {
    handleTaskTitleUpdate,
    isTitleEditing,
  };
}
