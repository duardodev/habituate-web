import { useFetchHabits } from './use-fetch-habits';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import dayjs from 'dayjs';

export function useHabitsMetric() {
  const { completedDays } = useCompletedDaysStore();
  const { getToken } = useAuth();
  const today = dayjs().utcOffset(-3).startOf('day').toISOString();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-habits'],
    queryFn: async () => {
      const token = await getToken();
      return await useFetchHabits(token);
    },
  });

  const habitsCount = data?.habits.length ?? 0;

  const completedHabitsCount = data?.habits.filter(habit => completedDays[habit.id]?.some(date => date === today)).length ?? 0;
  const percentage = (completedHabitsCount / habitsCount) * 100;

  return {
    completedHabitsCount,
    percentage,
    isLoading,
    isError,
  };
}
