import { addHabit } from '@/app/actions';
import { toast } from 'sonner';

export function useAddHabitDialog() {
  async function handleAddHabit(form: FormData) {
    const title = form.get('title') as string;

    if (!title || title.trim() === '') {
      toast.error('Informe o novo hábito!');
      return;
    }

    const response = await addHabit(form);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Hábito adicionado com sucesso!');
  }

  return {
    handleAddHabit,
  };
}
