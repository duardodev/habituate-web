'use client';

import { useTaskContext } from '@/hooks/use-task-context';
import { cn } from '@/lib/utils';

export function TaskPriority() {
  const { priority, completed } = useTaskContext();

  return (
    <span
      className={cn(
        'flex items-center justify-center text-xs px-1.5 py-0.5 rounded-md font-medium',
        priority === 'p1' && 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
        priority === 'p2' && 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
        priority === 'p3' && 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
        completed && 'opacity-50'
      )}
    >
      {(priority === 'p1' && 'High') || (priority === 'p2' && 'Medium') || (priority === 'p3' && 'Low')}
    </span>
  );
}
