import { addTask } from '@/app/actions';
import { toast } from 'sonner';

export function useAddTaskDialog() {
  async function handleAddTask(form: FormData) {
    const title = form.get('title') as string;

    if (!title || title.trim() === '') {
      toast.error('Informe a nova tarefa!');
      return;
    }

    const response = await addTask(form);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Tarefa adicionada com sucesso!');
  }

  return {
    handleAddTask,
  };
}
