import { monthsNames } from '@/lib/data';
import dayjs from 'dayjs';

export function useTasksInfo() {
  const currentMonth = monthsNames[dayjs().month()];
  const currentYear = dayjs().year();
  const currentDay = dayjs().date();

  return {
    currentMonth,
    currentYear,
    currentDay,
  };
}
