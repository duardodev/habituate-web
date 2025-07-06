import { Habit } from './habit';
import { getHabits } from '@/app/api/get-habits';
import { HabitProvider } from '@/contexts/habit-context';
import { auth } from '@clerk/nextjs/server';
import { unstable_cache } from 'next/cache';
import { cacheTag } from '@/lib/utils';

export async function Habits() {
  const { getToken, userId } = auth();
  const token = await getToken();

  const getCachedHabits = unstable_cache(
    async () => {
      return await getHabits(token);
    },
    [`user-habits`],
    {
      revalidate: 3600,
      tags: [cacheTag('add-habit', userId), cacheTag('delete-habit', userId), cacheTag('update-habit-title', userId)],
    }
  );

  const { habits } = await getCachedHabits();

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
