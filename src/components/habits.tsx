import { cookies } from 'next/headers';
import { Habit } from './habit';
import { api } from '@/functions/api';

interface Habit {
  id: string;
  title: string;
}

export async function Habits() {
  const isAuthenticated = Boolean(cookies().get('token'));
  const token = cookies().get('token')?.value;

  if (!isAuthenticated) {
    return;
  }

  const response = await api('/habits', {
    next: {
      revalidate: 3600,
      tags: ['get-habits'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: Habit[] = await response.json();

  if (data.length === 0) {
    return;
  }

  return (
    <div className="mt-4 space-y-4 pb-4">
      {data.map(habit => {
        return <Habit key={habit.id} id={habit.id} title={habit.title} />;
      })}
    </div>
  );
}
