import { addHabit } from '@/app/actions';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddHabitDialog() {
  const queryClient = useQueryClient();

  async function handleAddHabit(form: FormData) {
    const title = form.get('title') as string;

    if (!title || title.trim() === '') {
      toast.error('Enter the new habit!');
      return;
    }

    const response = await addHabit(form);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['get-habits'] });
    toast.success('Habit added successfully!');
  }

  return {
    handleAddHabit,
  };
}
