import { api } from '@/functions/api';
import { MetricRing } from './metric-ring';
import { useHabits } from '@/hooks/use-habits';
import { auth } from '@clerk/nextjs/server';
import dayjs from 'dayjs';

export async function HabitsMetric() {
  const { getToken } = auth();
  const { habits } = await useHabits();
  const token = await getToken();
  const today = dayjs().startOf('day').toISOString();
  const countHabits = habits.length;

  const response = await api(`/habits/completed/${today}`, {
    next: {
      tags: ['get-completed-habits-count'],
      revalidate: 3600,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const completedHabitsCount: number = await response.json();
  const percentage = (completedHabitsCount / countHabits) * 100;

  return <MetricRing label="Hábitos" sublabel="feito(s)" value={completedHabitsCount} color="#2CD758" percentage={percentage} />;
}
