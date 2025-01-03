'use client';

import { monthsNames } from '@/lib/data';
import { useDateStore } from '@/store/date-store';

export function MonthYearDisplay() {
  const { currentDate } = useDateStore();
  const currentMonth = monthsNames[currentDate.month()].slice(0, 3);
  const currentYear = currentDate.year();

  return (
    <h2 className="text-foreground/95 font-medium text-nowrap">
      {currentMonth} {currentYear}
    </h2>
  );
}
