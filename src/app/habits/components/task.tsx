'use client';

import { CheckCircle2, Circle, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTask } from '@/hooks/use-task';
import { UserActionsMenu } from './user-actions-menu';
import { TitleEditor } from './title-editor';
import { cn } from '@/lib/utils';

interface TaskProps {
  id: string;
  completed: boolean;
  title: string;
  priority: string;
}

export function Task({ id, completed, title, priority }: TaskProps) {
  const { handleTaskToggle, isTitleEditing, setIsTitleEditing, handleTaskTitleUpdate, removeTask } = useTask({ id });

  return (
    <div className="p-4 flex items-center gap-3 group">
      <button type="submit" onClick={e => handleTaskToggle(e)} className="flex-none transition-all">
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
        )}
      </button>

      <div className="flex-1 flex gap-3 min-w-0">
        {isTitleEditing ? (
          <TitleEditor title={title} onTitleSave={handleTaskTitleUpdate} />
        ) : (
          <p
            className={cn(
              'max-w-40 truncate text-sm',
              completed ? 'text-zinc-400 dark:text-zinc-500 line-through' : 'text-zinc-900 dark:text-zinc-100'
            )}
          >
            {title}
          </p>
        )}

        <span
          className={cn(
            'flex items-center justify-center text-xs px-1.5 py-0.5 rounded-md font-medium',
            priority === 'p1' && 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
            priority === 'p2' && 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
            priority === 'p3' && 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
            completed && 'opacity-50'
          )}
        >
          {(priority === 'p1' && 'Alta') || (priority === 'p2' && 'Média') || (priority === 'p3' && 'Baixa')}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="opacity-100 lg:opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="w-5 h-5 text-zinc-400" />
          </button>
        </DropdownMenuTrigger>

        <UserActionsMenu onRename={() => setIsTitleEditing(true)} onRemove={() => removeTask(id)} />
      </DropdownMenu>
    </div>
  );
}
