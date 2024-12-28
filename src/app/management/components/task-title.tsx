'use client';

import { TitleEditor } from './title-editor';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskTitle } from '@/hooks/use-task-title';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function TaskTitle() {
  const { title, completed } = useTaskContext();
  const { handleTaskTitleUpdate, isTitleEditing } = useTaskTitle();

  return (
    <>
      {isTitleEditing ? (
        <TitleEditor title={title} onTitleSave={handleTaskTitleUpdate} />
      ) : (
        <Tooltip text={title}>
          <p
            className={cn(
              'max-w-40 truncate text-sm',
              completed ? 'text-zinc-400 dark:text-zinc-500 line-through' : 'text-zinc-900 dark:text-zinc-100'
            )}
          >
            {title}
          </p>
        </Tooltip>
      )}
    </>
  );
}
