import { toggleHabit } from '@/app/actions';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useHabitContext } from './use-habit-context';
import { useDateStore } from '@/store/date-store';
import dayjs from 'dayjs';

interface useDayCheckboxProps {
  currentWeekDay: dayjs.Dayjs;
}

export function useDayCheckbox({ currentWeekDay }: useDayCheckboxProps) {
  const { id } = useHabitContext();
  const { completedDays, setCompletedDay } = useCompletedDaysStore();
  const { currentDate } = useDateStore();

  const isDisabled = currentWeekDay.isAfter(currentDate);
  const habitCompletedDays = completedDays[id] || [];
  const isChecked = habitCompletedDays.includes(currentWeekDay.startOf('day').utc().toISOString());

  async function handleHabitToggle(date: string) {
    setCompletedDay(id, date);

    try {
      await toggleHabit(id, date);
    } catch (error) {
      setCompletedDay(id, date);
    }
  }

  return {
    isChecked,
    isDisabled,
    handleHabitToggle,
  };
}
