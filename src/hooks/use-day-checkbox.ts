import { toggleHabit } from '@/app/actions/habit-actions';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useHabitContext } from './use-habit-context';
import { useDateStore } from '@/store/date-store';
import { toast } from 'sonner';
import dayjs from 'dayjs';

interface useDayCheckboxProps {
  currentWeekDay: dayjs.Dayjs;
}

export function useDayCheckbox({ currentWeekDay }: useDayCheckboxProps) {
  const { id } = useHabitContext();
  const { completedDays, setCompletedDay } = useCompletedDaysStore();
  const { today } = useDateStore();

  const isDisabled = currentWeekDay.isAfter(today);
  const habitCompletedDays = completedDays[id] || [];
  const isChecked = habitCompletedDays.includes(currentWeekDay.startOf('day').utc().toISOString());

  async function handleHabitToggle(date: string) {
    setCompletedDay(id, date);
    const response = await toggleHabit(id, date);

    if (!response.success) {
      toast.error(response.error);
      setCompletedDay(id, date);
    }
  }

  return {
    isChecked,
    isDisabled,
    handleHabitToggle,
  };
}
