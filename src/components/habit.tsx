'use client';

import { useDateStore } from '@/store/date-store';
import { Checkbox } from './ui/checkbox';
import dayjs from 'dayjs';

interface HabitProps {
  id: string;
  title: string;
}

export function Habit({ title }: HabitProps) {
  const { currentDate } = useDateStore();
  const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.add(i, 'day'));
  const today = dayjs();

  return (
    <li className="flex items-center justify-between">
      <p>{title}</p>
      <div className="flex items-center gap-x-6">
        {currentWeekDays.map(currentWeekDay => {
          const isDisabled = currentWeekDay.isAfter(today, 'day');
          return <Checkbox key={currentWeekDay.toString()} disabled={isDisabled} />;
        })}
      </div>
    </li>
  );
}
