'use client';

import { useEffect, useState } from 'react';
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

export function Habit({ id, title }: HabitProps) {
  const { currentDate } = useDateStore();
  const [daysWithCompletedHabit, setDaysWithCompletedHabit] = useState<string[]>([]);
  const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.add(i, 'day'));
  const today = dayjs();

  async function handleGetDaysWithCompletedHabit() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/days/habits/completed`);
    const data = await response.json();

    const daysWithCompletedHabit = data
      .filter((dayWithCompletedHabits: DayWithCompletedHabits) => {
        return dayWithCompletedHabits.completedHabits.some((completedHabit: CompletedHabit) => completedHabit.habitId === id);
      })
      .map((dayWithCompletedHabits: DayWithCompletedHabits) => dayWithCompletedHabits.date);

    setDaysWithCompletedHabit(daysWithCompletedHabit);
  }

  async function handleToggleHabit(date: string) {
    await toggleHabit(id, date);

    if (daysWithCompletedHabit.includes(date)) {
      setDaysWithCompletedHabit(daysWithCompletedHabit.filter(dateWithCompletedHabits => dateWithCompletedHabits !== date));
    } else {
      setDaysWithCompletedHabit([...daysWithCompletedHabit, date]);
    }
  }

  useEffect(() => {
    handleGetDaysWithCompletedHabit();
  }, [currentDate]);

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
              onClick={() => handleToggleHabit(currentWeekDay.toISOString())}
              disabled={isDisabled}
              checked={isChecked}
            />
          );
        })}
      </div>
    </li>
  );
}
