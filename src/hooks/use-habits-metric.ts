import { useHabitsQuery } from './use-habits-query';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useDateStore } from '@/store/date-store';

export function useHabitsMetric() {
  const { data } = useHabitsQuery();
  const { completedDays } = useCompletedDaysStore();
  const { currentDate } = useDateStore();
  const today = currentDate.startOf('day').utc().toISOString();

  const habitsCount = data?.habits.length ?? 0;
  const completedHabitsCount =
    data?.habits.filter(habit => completedDays[habit.id]?.some(date => date === today)).length ?? 0;
  const percentage = completedHabitsCount > 0 ? (completedHabitsCount / habitsCount) * 100 : 0;

  return {
    completedHabitsCount,
    percentage,
  };
}
