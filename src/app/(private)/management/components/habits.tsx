import { getHabits } from '@/app/api/get-habits';
import { Habit } from './habit';
import { HabitProvider } from '@/contexts/habit-context';
import { auth } from '@clerk/nextjs/server';

export async function Habits() {
  const { getToken, userId } = auth();
  const token = await getToken();

  const { habits } = await getHabits(token, userId);

  if (habits.length === 0) {
    return (
      <div className="mt-4 flex items-center justify-center">
        <p className="text-sm text-center">
          No habits found. <br className="sm:hidden" />
          How about adding a new habit to start?
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
