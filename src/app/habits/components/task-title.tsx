'use client';

import { useTasksStore } from '@/store/use-tasks-store';
import { TitleEditor } from './title-editor';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskTitleStore } from '@/store/use-task-title-store';
import { cn } from '@/lib/utils';
import { useTaskTitle } from '@/hooks/use-task-title';

export function TaskTitle() {
  const { title, completed } = useTaskContext();
  const { isTitleEditing } = useTaskTitleStore();
  const { handleTaskTitleUpdate } = useTaskTitle();

  return (
    <>
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
    </>
  );
}
