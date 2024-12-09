import { useTasksInfo } from '@/hooks/use-tasks-info';
import { AmountTasks } from './amount-tasks';

export function TasksInfo() {
  const { currentMonth, currentDay, currentYear } = useTasksInfo();

  return (
    <div className="p-4 flex items-center justify-between border-b border-border">
      <div>
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Tarefas para hoje</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {currentDay} de {currentMonth.toLowerCase()} de {currentYear}
        </p>
      </div>

      <AmountTasks />
    </div>
  );
}
