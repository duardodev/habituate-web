import { useHabitsQuery } from './use-habits-query';
import { useDateStore } from '@/store/date-store';
import { useQueries } from '@tanstack/react-query';

export function useHabitsMetric() {
  const { data: habits } = useHabitsQuery();
  const { today } = useDateStore();
  const todayDate = today.startOf('day').utc().toISOString();

  const completedDatesQueries = useQueries({
    queries: (habits?.habits ?? []).map(habit => ({
      queryKey: ['completed-dates-for-habit', habit.id],
      staleTime: 0,
    })),
  });

  const habitsCount = habits?.habits.length ?? 0;
  const completedHabitsCount = completedDatesQueries.reduce((count, query) => {
    const completedDates = (query.data as string[]) ?? [];
    return count + (completedDates.includes(todayDate) ? 1 : 0);
  }, 0);

  const percentage = completedHabitsCount > 0 ? (completedHabitsCount / habitsCount) * 100 : 0;

  return {
    completedHabitsCount,
    percentage,
  };
}
