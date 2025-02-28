'use client';

import { DayCheckbox } from './day-checkbox';
import { useCurrentWeekDays } from '@/hooks/use-current-week-days';

export function Checkboxes() {
  const { currentWeekDays } = useCurrentWeekDays();

  return (
    <div className="flex items-center gap-x-6">
      {currentWeekDays.map(currentWeekDay => {
        return (
          <DayCheckbox
            key={currentWeekDay.toString()}
            currentWeekDay={currentWeekDay}
            data-testid={`day-checkbox-${currentWeekDay.toISOString()}`}
          />
        );
      })}
    </div>
  );
}
