import { toggleHabit } from '@/app/actions/habit-actions';
import { useHabitContext } from './use-habit-context';
import { useDateStore } from '@/store/date-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface useDayCheckboxProps {
  currentWeekDay: dayjs.Dayjs;
}

export function useDayCheckbox({ currentWeekDay }: useDayCheckboxProps) {
  const { id } = useHabitContext();
  const { today } = useDateStore();
  const queryClient = useQueryClient();

  const completedDates = queryClient.getQueryData<string[]>(['completed-dates-for-habit', id]) || [];
  const isChecked = completedDates.includes(currentWeekDay.startOf('day').utc().toISOString());
  const isDisabled = currentWeekDay.isAfter(today);

  const { mutate: toggleHabitMutation } = useMutation({
    mutationFn: async (date: string) => {
      return toggleHabit(id, date);
    },
    onMutate: async date => {
      await queryClient.cancelQueries({ queryKey: ['completed-dates-for-habit', id] });
      await queryClient.cancelQueries({ queryKey: ['habits'] });

      const previousData = queryClient.getQueryData<string[]>(['completed-dates-for-habit', id]);

      queryClient.setQueryData(['completed-dates-for-habit', id], (oldData: string[] | undefined) => {
        if (!oldData) return [date];
        return oldData.includes(date) ? oldData.filter(d => d !== date) : [...oldData, date];
      });

      return { previousData };
    },
    onError: (_error, _date, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['completed-dates-for-habit', id], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['completed-dates-for-habit', id] });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  async function handleHabitToggle(date: string) {
    toggleHabitMutation(date);
  }

  return {
    isChecked,
    isDisabled,
    handleHabitToggle,
  };
}
