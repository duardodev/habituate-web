import { removeTasks } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';

interface RemoveTasksButtonProps {
  tasksCount: number;
}

export function RemoveTasksButton({ tasksCount }: RemoveTasksButtonProps) {
  return (
    <form action={removeTasks}>
      <Tooltip text="Deletar todas as tarefas">
        <Button
          variant="ghost"
          type="submit"
          disabled={tasksCount === 0}
          className="flex justify-start items-center gap-2 px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 
            hover:text-zinc-600 dark:hover:text-zinc-300 
            hover:bg-zinc-50 dark:hover:bg-zinc-800/50
            rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </Tooltip>
    </form>
  );
}
