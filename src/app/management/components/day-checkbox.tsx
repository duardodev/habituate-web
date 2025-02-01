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
  const label = `Hábito "${title}" marcado como ${
    isChecked ? 'incompleto' : 'completo'
  } em ${currentWeekDay.date()} de ${monthsNames[currentWeekDay.month()]} de ${currentWeekDay.year()}`;

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
