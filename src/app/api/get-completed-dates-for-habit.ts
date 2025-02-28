import { api } from '@/functions/api';

interface Day {
  id: string;
  date: string;
}

interface DatesTheHabitWasCompletedData {
  datesTheHabitWasCompleted: Day[];
}

export async function getCompletedDatesForHabit(id: string, token: string | null) {
  const response = await api(`/completed-habits/${id}/days`, {
    next: {
      revalidate: 3600,
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
