import { toast } from 'sonner';
import { useTasksStore } from '@/store/use-tasks-store';

interface TasksResponse {
  tasks: {
    id: string;
    title: string;
    priority: string;
    completed: boolean;
  }[];
}

export function useAddTaskDialog() {
  const addTask = useTasksStore(state => state.addTask);

  function handleAddTask(form: FormData) {
    const title = form.get('title') as string;
    const priority = form.get('priority') as string;
    const randomId = `_${Math.random().toString(30).substring(2, 17) + Math.random().toString(30).substring(2, 17)}`;

    if (!title || title.trim() === '') {
      toast.error('Informe a nova tarefa!');
      return;
    }

    const newTask = {
      id: randomId,
      title,
      priority,
      completed: false,
    };

    addTask(newTask);

    toast.success('Tarefa adicionada com sucesso!');
  }

  return {
    handleAddTask,
  };
}
