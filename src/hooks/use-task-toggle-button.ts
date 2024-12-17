import { useTasksStore } from '@/store/use-tasks-store';
import { useTaskContext } from './use-task-context';

export function useTaskToggleButton() {
  const { id } = useTaskContext();
  const toggleTask = useTasksStore(state => state.toggleTask);

  function handleTaskToggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggleTask(id);
  }

  return {
    handleTaskToggle,
  };
}
