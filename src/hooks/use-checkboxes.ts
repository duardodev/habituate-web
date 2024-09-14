import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useCurrentWeekDays } from './use-current-week-days';

interface Day {
  id: string;
  date: Date;
}

interface useCheckboxesProps {
  habitId: string;
}

async function fetchDatesTheHabitWasCompleted(id: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/completed-habits/${id}/days`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.datesTheHabitWasCompleted.map(
    (dateTheHabitWasCompleted: Day) => dateTheHabitWasCompleted.date
  );
}

export function useCheckboxes({ habitId }: useCheckboxesProps) {
  const { currentWeekDays } = useCurrentWeekDays();
  const { setCompletedDays } = useCompletedDaysStore();

  const { getToken } = useAuth();

  const { data: datesTheHabitWasCompleted = [], isSuccess } = useQuery({
    queryKey: ['days-with-specific-comleted-habit', habitId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token not available');
      return fetchDatesTheHabitWasCompleted(habitId, token);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setCompletedDays(habitId, datesTheHabitWasCompleted);
    }
  }, [isSuccess]);

  return {
    currentWeekDays,
  };
}
