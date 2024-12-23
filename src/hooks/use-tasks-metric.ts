import { useTasksStore } from '@/store/use-tasks-store';

export function useTasksMetric() {
  const tasksCount = useTasksStore(state => state.amountTasks());
  const completedTasksCount = useTasksStore(state => state.amountCompletedTasks());
  const percentage = tasksCount > 0 ? (completedTasksCount / tasksCount) * 100 : 0;

  return {
    completedTasksCount,
    percentage,
  };
}
