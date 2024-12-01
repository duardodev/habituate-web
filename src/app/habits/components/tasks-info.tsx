import { monthsNames } from '@/lib/data';
import dayjs from 'dayjs';

interface TasksInfo {
  tasksCount: number;
}

export function TasksInfo({ tasksCount = 0 }: TasksInfo) {
  const currentMonth = monthsNames[dayjs().month()];
  const currentYear = dayjs().year();
  const currentDay = dayjs().date();

  return (
    <div className="p-4 flex items-center justify-between border-b border-border">
      <div>
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Tarefas para hoje</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {currentDay} de {currentMonth.toLowerCase()} de {currentYear}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          {tasksCount} tarefas
        </span>
      </div>
    </div>
  );
}
