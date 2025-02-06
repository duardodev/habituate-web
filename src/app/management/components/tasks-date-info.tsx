'use client';

import { monthsNames } from '@/lib/data';
import { useDateStore } from '@/store/date-store';

export function TasksDateInfo() {
  const { today } = useDateStore();
  const currentDay = today.date();
  const currentMonth = monthsNames[today.month()];
  const currentYear = today.year();

  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      {currentMonth} {currentDay}, {currentYear}
    </p>
  );
}
