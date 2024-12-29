import { useHabitsQuery } from './use-habits-query';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import dayjs from 'dayjs';

export function useHabitsMetric() {
  const { data } = useHabitsQuery();
  const { completedDays } = useCompletedDaysStore();
  const today = dayjs().utcOffset(-3).startOf('day').toISOString();

  const habitsCount = data?.habits.length ?? 0;
  const completedHabitsCount = data?.habits.filter(habit => completedDays[habit.id]?.some(date => date === today)).length ?? 0;
  const percentage = completedHabitsCount > 0 ? (completedHabitsCount / habitsCount) * 100 : 0;

  return {
    completedHabitsCount,
    percentage,
  };
}
