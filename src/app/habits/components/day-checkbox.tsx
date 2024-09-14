'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useDayCheckbox } from '@/hooks/use-day-checkbox';
import dayjs from 'dayjs';

interface DayCheckboxProps {
  currentWeekDay: dayjs.Dayjs;
  habitId: string;
}

export function DayCheckbox({ currentWeekDay, habitId }: DayCheckboxProps) {
  const { handleHabitToggle, isChecked, isDisabled } = useDayCheckbox({ habitId, currentWeekDay });

  return (
    <Checkbox
      onClick={() => handleHabitToggle(currentWeekDay.utc().startOf('day').toISOString())}
      checked={isChecked}
      disabled={isDisabled}
    />
  );
}
