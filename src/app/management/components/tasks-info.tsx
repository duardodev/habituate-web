import dynamic from 'next/dynamic';
import { AmountTasks } from './amount-tasks';
import { TasksDateInfoSkeleton } from './tasks-date-info-skeleton';

const TasksDateInfo = dynamic(() => import('./tasks-date-info').then(mod => mod.TasksDateInfo), {
  loading: () => <TasksDateInfoSkeleton />,
  ssr: false,
});

export function TasksInfo() {
  return (
    <div className="p-4 flex items-center justify-between border-b border-border">
      <div>
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Tarefas para hoje</h2>
        <TasksDateInfo />
      </div>

      <AmountTasks />
    </div>
  );
}
