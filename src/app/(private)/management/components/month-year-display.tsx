'use client';

import { monthsNames } from '@/lib/data';
import { useDateStore } from '@/store/date-store';

export function MonthYearDisplay() {
  const { currentDate } = useDateStore();
  const currentMonth = monthsNames[currentDate.month()];
  const currentYear = currentDate.year();

  return (
    <p className="text-foreground/95 font-medium text-nowrap">
      {currentMonth} {currentYear}
    </p>
  );
}
