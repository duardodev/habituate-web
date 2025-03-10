'use client';

import { useCurrentWeekDays } from '@/hooks/use-current-week-days';
import { daysNames } from '@/lib/data';

export function WeekDays() {
  const { currentWeekDays } = useCurrentWeekDays();

  return (
    <div className="flex gap-x-6">
      {currentWeekDays.map(currentWeekDay => {
        return (
          <div key={currentWeekDay.toString()} className="relative">
            {currentWeekDay.isToday() && (
              <span data-testid="today-indicator" className="absolute left-7 -top-1 flex h-2 w-2 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            )}

            <p className="w-7 text-sm text-center text-foreground/95 font-medium">
              {daysNames[currentWeekDay.day()]}
              <span className="block">{currentWeekDay.format('DD')}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
