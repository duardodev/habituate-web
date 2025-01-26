'use client';

import { monthsNames } from '@/lib/data';
import { useDateStore } from '@/store/date-store';
import { CalendarDays } from 'lucide-react';

export function MonthYearDisplay() {
  const { currentDate } = useDateStore();
  const currentMonth = monthsNames[currentDate.month()];
  const currentYear = currentDate.year();

  return (
    <div className="flex items-center gap-x-2">
      <CalendarDays className="text-foreground/95 h-5 w-5" />
      <h2 className="text-foreground/95 font-medium text-nowrap">
        {currentMonth} de {currentYear}
      </h2>
    </div>
  );
}
