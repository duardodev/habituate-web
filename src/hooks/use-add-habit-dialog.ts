import { addHabit } from '@/app/actions/habit-actions';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddHabitDialog() {
  const queryClient = useQueryClient();

  async function handleAddHabit(form: FormData) {
    const title = form.get('title')?.toString().trim();

    if (!title) {
      toast.error('Enter the new habit!');
      return;
    }

    const response = await addHabit(form);

    if (!response.success) {
      toast.error(response.error);
      return;
    }

    toast.success('Habit successfully added!');
    queryClient.invalidateQueries({ queryKey: ['get-habits'] });
  }

  return {
    handleAddHabit,
  };
}
