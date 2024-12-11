import { HabitProvider } from '@/contexts/habit-context';
import { Habit } from './habit';
import { useHabits } from '@/hooks/use-habits';

export async function Habits() {
  const data = await useHabits();

  if (data?.habits.length === 0) {
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
      {data?.habits.map(habit => {
        return (
          <HabitProvider
            key={habit.id}
            habit={{
              id: habit.id,
              title: habit.title,
            }}
          >
            <Habit key={habit.id} id={habit.id} />
          </HabitProvider>
        );
      })}
    </div>
  );
}
