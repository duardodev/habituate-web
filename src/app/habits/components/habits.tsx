import { Habit } from './habit';
import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';

interface Habits {
  habits: {
    id: string;
    title: string;
  }[];
}

export async function Habits() {
  try {
    const { getToken } = auth();
    const token = await getToken();

    const response = await api('/habits', {
      next: {
        revalidate: 3600,
        tags: ['get-habits'],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: Habits = await response.json();

    if (data.habits.length === 0) {
      return (
        <div className="h-24 flex items-center justify-center">
          <p className="text-sm text-center">Nenhum hábito encontrado. Que tal adicionar um novo hábito para começar?</p>
        </div>
      );
    }

    return (
      <div className="mt-4 space-y-4 pb-4">
        {data.habits.map(habit => {
          return <Habit key={habit.id} id={habit.id} title={habit.title} />;
        })}
      </div>
    );
  } catch (error) {
    return (
      <div className="h-24 flex items-center justify-center">
        <p className="text-sm text-center">Não foi possível carregar os hábitos. Por favor atualize a página.</p>
      </div>
    );
  }
}
