'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDateStore } from '@/store/date-store';
import { toggleHabit } from '@/app/actions';
import { Checkbox } from './ui/checkbox';
import dayjs from 'dayjs';

interface HabitProps {
  id: string;
  title: string;
}

interface CompletedHabit {
  id: string;
  habitId: string;
  dayId: string;
}

interface DayWithCompletedHabits {
  id: string;
  date: Date;
  completedHabits: CompletedHabit[];
}

async function getDaysWithCompletedHabit(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/days/habits/completed`);
  const data = await response.json();

  return data
    .filter((dayWithCompletedHabits: DayWithCompletedHabits) => {
      return dayWithCompletedHabits.completedHabits.some((completedHabit: CompletedHabit) => completedHabit.habitId === id);
    })
    .map((dayWithCompletedHabit: DayWithCompletedHabits) => dayWithCompletedHabit.date);
}

export function Habit({ id, title }: HabitProps) {
  const { currentDate } = useDateStore();
  const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.add(i, 'day'));
  const queryClient = useQueryClient();
  const today = dayjs();

  const { data: daysWithCompletedHabit = [] } = useQuery({
    queryKey: ['days-with-comleted-habit', id],
    queryFn: () => getDaysWithCompletedHabit(id),
  });

  const mutation = useMutation({
    mutationFn: (date: string) => toggleHabit(id, date),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['days-with-comleted-habit', id],
      });
    },
  });

  return (
    <li className="flex items-center justify-between">
      <p>{title}</p>
      <div className="flex items-center gap-x-6">
        {currentWeekDays.map(currentWeekDay => {
          const isDisabled = currentWeekDay.isAfter(today, 'day');
          const isChecked = daysWithCompletedHabit.includes(currentWeekDay.toISOString());

          return (
            <Checkbox
              key={currentWeekDay.toString()}
              onClick={() => mutation.mutateAsync(currentWeekDay.toISOString())}
              disabled={isDisabled}
              checked={isChecked}
            />
          );
        })}
      </div>
    </li>
  );
}
