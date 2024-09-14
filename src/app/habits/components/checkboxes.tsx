'use client';

import { useCheckboxes } from '@/hooks/use-checkboxes';
import { DayCheckbox } from './day-checkbox';

interface CheckboxesProps {
  habitId: string;
}

export function Checkboxes({ habitId }: CheckboxesProps) {
  const { currentWeekDays } = useCheckboxes({ habitId });

  return (
    <div className="flex items-center gap-x-6">
      {currentWeekDays.map(currentWeekDay => {
        return (
          <DayCheckbox
            key={currentWeekDay.toString()}
            habitId={habitId}
            currentWeekDay={currentWeekDay}
          />
        );
      })}
    </div>
  );
}
