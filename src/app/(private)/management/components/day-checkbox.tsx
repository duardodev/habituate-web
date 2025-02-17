'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useDayCheckbox } from '@/hooks/use-day-checkbox';
import { useHabitContext } from '@/hooks/use-habit-context';
import { monthsNames } from '@/lib/data';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';

interface DayCheckboxProps extends CheckboxProps {
  currentWeekDay: dayjs.Dayjs;
}

export function DayCheckbox({ currentWeekDay, ...rest }: DayCheckboxProps) {
  const { handleHabitToggle, isChecked, isDisabled } = useDayCheckbox({ currentWeekDay });
  const { title } = useHabitContext();
  const label = `Habit "${title}" marked as ${isChecked ? 'complete' : 'incomplete'} on ${
    monthsNames[currentWeekDay.month()]
  } ${currentWeekDay.date()}, ${currentWeekDay.year()}`;

  return (
    <Checkbox
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleHabitToggle(currentWeekDay.startOf('day').utc().toISOString());
        }
      }}
      onClick={() => handleHabitToggle(currentWeekDay.startOf('day').utc().toISOString())}
      aria-label={label}
      checked={isChecked}
      disabled={isDisabled}
      {...rest}
    />
  );
}
