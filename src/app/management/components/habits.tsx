import { Habit } from './habit';
import { ErrorFallback } from './error-fallback';
import { HabitProvider } from '@/contexts/habit-context';
import { useFetchHabits } from '@/hooks/use-fetch-habits';
import { auth } from '@clerk/nextjs/server';

export async function Habits() {
  try {
    const { getToken } = auth();
    const token = await getToken();

    const { habits } = await useFetchHabits(token);

    if (habits.length === 0) {
      return (
        <div className="mt-4 flex items-center justify-center">
          <p className="text-sm text-center">
            Nenhum hábito encontrado. <br className="sm:hidden" />
            Que tal adicionar um novo hábito para começar?
          </p>
        </div>
      );
    }

    return (
      <div className="mt-4 space-y-4">
        {habits.map(habit => {
          return (
            <HabitProvider
              key={habit.id}
              habit={{
                id: habit.id,
                title: habit.title,
                emoji: habit.emoji,
              }}
            >
              <Habit key={habit.id} id={habit.id} />
            </HabitProvider>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <ErrorFallback message="Falha ao carregar os dados dos hábitos. Espere um instante e tente novamente recarregando a página." />
    );
  }
}
