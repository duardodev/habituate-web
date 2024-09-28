import { toggleHabit } from '@/app/actions';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface useDayCheckboxProps {
  currentWeekDay: dayjs.Dayjs;
  habitId: string;
}

export function useDayCheckbox({ habitId, currentWeekDay }: useDayCheckboxProps) {
  const { completedDays, setCompletedDay } = useCompletedDaysStore();
  const queryClient = useQueryClient();
  const today = dayjs();

  const isDisabled = currentWeekDay.isAfter(today, 'day');
  const habitCompletedDays = completedDays[habitId] || [];
  const isChecked = habitCompletedDays.includes(currentWeekDay.utc().startOf('day').toISOString());

  const { mutateAsync: toggleHabitFn } = useMutation({
    mutationFn: (date: string) => toggleHabit(habitId, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['days-with-specific-completed-habit', habitId] });
    },
  });

  async function handleHabitToggle(date: string) {
    setCompletedDay(habitId, date);

    try {
      await toggleHabitFn(date);
    } catch (error) {
      setCompletedDay(habitId, date);
    }
  }

  return {
    isChecked,
    isDisabled,
    handleHabitToggle,
  };
}
