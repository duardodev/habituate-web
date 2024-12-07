import { monthsNames } from '@/lib/data';
import { useTasksStore } from '@/store/use-tasks-store';
import dayjs from 'dayjs';

export function useTasksInfo() {
  const amountCompletedTasks = useTasksStore(state => state.amountCompletedTasks());
  const amountTasks = useTasksStore(state => state.amountTasks());
  const currentMonth = monthsNames[dayjs().month()];
  const currentYear = dayjs().year();
  const currentDay = dayjs().date();

  return {
    amountCompletedTasks,
    amountTasks,
    currentMonth,
    currentYear,
    currentDay,
  };
}
