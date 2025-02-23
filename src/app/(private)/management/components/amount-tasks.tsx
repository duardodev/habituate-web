'use client';

import { useTasksStore } from '@/store/tasks-store';
import { Skeleton } from '@/components/ui/skeleton';
import { useLoading } from '@/hooks/use-loading';

export function AmountTasks() {
  const amountCompletedTasks = useTasksStore(state => state.amountCompletedTasks());
  const amountTasks = useTasksStore(state => state.amountTasks());
  const { isLoading } = useLoading();

  if (isLoading) {
    return <Skeleton className="h-6 w-16 rounded-full" />;
  }

  return (
    <span
      data-testid="amount-tasks"
      className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
    >
      {amountCompletedTasks}/{amountTasks} done
    </span>
  );
}
