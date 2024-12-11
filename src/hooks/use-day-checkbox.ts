import { toggleHabit } from '@/app/actions';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useHabitContext } from './use-habit-context';
import dayjs from 'dayjs';

interface useDayCheckboxProps {
  currentWeekDay: dayjs.Dayjs;
}

export function useDayCheckbox({ currentWeekDay }: useDayCheckboxProps) {
  const { id } = useHabitContext();
  const { completedDays, setCompletedDay } = useCompletedDaysStore();
  const queryClient = useQueryClient();
  const today = dayjs();

  const isDisabled = currentWeekDay.isAfter(today, 'day');
  const habitCompletedDays = completedDays[id] || [];
  const isChecked = habitCompletedDays.includes(currentWeekDay.utc().startOf('day').toISOString());

  const { mutateAsync: toggleHabitFn } = useMutation({
    mutationFn: (date: string) => toggleHabit(id, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['days-with-specific-completed-habit', id] });
    },
  });

  async function handleHabitToggle(date: string) {
    setCompletedDay(id, date);

    try {
      await toggleHabitFn(date);
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
