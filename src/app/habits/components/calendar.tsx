'use client';

import { useDateStore } from '@/store/date-store';
import { WeekDays } from './week-days';
import { WeekNavigation } from './week-navigation';
import { monthsNames } from '@/lib/data';

export function Calendar() {
  const { currentDate } = useDateStore();
  const currentMonth = monthsNames[currentDate.month()].slice(0, 3);
  const currentYear = currentDate.year();

  return (
    <div className="overflow-visible flex items-center justify-between gap-x-10">
      <div className="flex items-center gap-x-3">
        <h2 className="text-foreground/95 font-medium text-nowrap">
          {currentMonth} {currentYear}
        </h2>

        <WeekNavigation />
      </div>

      <WeekDays />
    </div>
  );
}
