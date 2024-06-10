import { api } from '@/functions/api';
import { Habit } from './habit';

interface Habit {
  id: string;
  title: string;
}

export async function Habits() {
  const response = await api('/habits', {
    next: {
      revalidate: 3600,
      tags: ['get-habits'],
    },
  });

  const data = await response.json();

  return (
    <ul className="mt-4 space-y-4">
      {data.map((habit: Habit) => (
        <Habit key={habit.id} id={habit.id} title={habit.title} />
      ))}
    </ul>
  );
}
