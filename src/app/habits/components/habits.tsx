import { Habit } from './habit';
import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';

interface Habit {
  id: string;
  title: string;
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

    if (!response.ok) {
      throw new Error('Failed to fetch habits');
    }

    const data: Habit[] = await response.json();

    if (data.length === 0) {
      return (
        <div className="h-24 flex items-center justify-center">
          <p className="text-sm">Nenhum hábito encontrado. Que tal adicionar um novo hábito para começar?</p>
        </div>
      );
    }

    return (
      <div className="mt-4 space-y-4 pb-4">
        {data.map(habit => {
          return <Habit key={habit.id} id={habit.id} title={habit.title} />;
        })}
      </div>
    );
  } catch (error) {
    return (
      <div className="h-24 flex items-center justify-center">
        <p className="text-sm">Não foi possível carregar os hábitos. Por favor atualize a página.</p>
      </div>
    );
  }
}
