import { useTasksStore } from '@/store/use-tasks-store';

export function useTasksMetric() {
  const amountTasks = useTasksStore(state => state.amountTasks());
  const amountCompletedTasks = useTasksStore(state => state.amountCompletedTasks());
  const percentage = amountTasks > 0 ? (amountCompletedTasks / amountTasks) * 100 : 0;

  return {
    amountTasks,
    amountCompletedTasks,
    percentage,
  };
}
