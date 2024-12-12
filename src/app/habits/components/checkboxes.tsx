'use client';

import { useEffect } from 'react';
import { DayCheckbox } from './day-checkbox';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useCurrentWeekDays } from '@/hooks/use-current-week-days';
import { useHabitContext } from '@/hooks/use-habit-context';

interface CheckboxesProps {
  datesTheHabitWasCompleted: string[];
}

export function Checkboxes({ datesTheHabitWasCompleted }: CheckboxesProps) {
  const { setCompletedDays } = useCompletedDaysStore();
  const { currentWeekDays } = useCurrentWeekDays();
  const { id } = useHabitContext();

  useEffect(() => {
    if (datesTheHabitWasCompleted) {
      setCompletedDays(id, datesTheHabitWasCompleted);
    }
  }, []);

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
