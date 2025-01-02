'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useDayCheckbox } from '@/hooks/use-day-checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';

interface DayCheckboxProps extends CheckboxProps {
  currentWeekDay: dayjs.Dayjs;
}

export function DayCheckbox({ currentWeekDay, ...rest }: DayCheckboxProps) {
  const { handleHabitToggle, isChecked, isDisabled } = useDayCheckbox({ currentWeekDay });

  return (
    <Checkbox
      onClick={() => handleHabitToggle(currentWeekDay.startOf('day').utc().toISOString())}
      checked={isChecked}
      disabled={isDisabled}
      {...rest}
    />
  );
}
