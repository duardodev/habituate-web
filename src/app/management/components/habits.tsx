import { Habit } from './habit';
import { HabitProvider } from '@/contexts/habit-context';
import { useFetchHabits } from '@/hooks/use-fetch-habits';
import { auth } from '@clerk/nextjs/server';

export async function Habits() {
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
}
