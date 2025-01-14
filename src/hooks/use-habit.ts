import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';

interface useHabitProps {
  id: string;
}

interface Day {
  id: string;
  date: string;
}

interface DatesTheHabitWasCompletedData {
  datesTheHabitWasCompleted: Day[];
}

export async function useHabit({ id }: useHabitProps): Promise<string[]> {
  const { getToken } = auth();
  const token = await getToken();

  const response = await api(`/completed-habits/${id}/days`, {
    next: {
      revalidate: 3600,
      tags: ['days-with-specific-comleted-habit'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: DatesTheHabitWasCompletedData = await response.json();

  const datesTheHabitWasCompleted: string[] = data.datesTheHabitWasCompleted.map(
    dateTheHabitWasCompleted => dateTheHabitWasCompleted.date
  );

  return datesTheHabitWasCompleted;
}
