'use client';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useTasksStore } from '@/store/use-tasks-store';
import { Trash2 } from 'lucide-react';

export function RemoveTasksButton() {
  const removeAllTasks = useTasksStore(state => state.removeAllTasks);
  const amountTasks = useTasksStore(state => state.amountTasks());

  return (
    <Tooltip text="Deletar todas as tarefas">
      <Button
        onClick={removeAllTasks}
        variant="ghost"
        type="submit"
        disabled={amountTasks === 0}
        className="flex justify-start items-center gap-2 px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 
            hover:text-zinc-600 dark:hover:text-zinc-300 
            hover:bg-zinc-50 dark:hover:bg-zinc-800/50
            rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </Tooltip>
  );
}
