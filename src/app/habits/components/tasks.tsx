import { Task } from './task';
import { TasksInfo } from './tasks-info';
import { AddTaskDialog } from './add-task-dialog';
import { RemoveTasksButton } from './remove-tasks-button';
import { useTasks } from '@/hooks/use-tasks';
import { cn } from '@/lib/utils';

export async function Tasks() {
  const { tasks } = await useTasks();

  return (
    <div
      className={cn(
        'w-full md:max-w-sm mt-6',
        'bg-white dark:bg-background',
        'border border-border',
        'rounded-2xl shadow-none min-[530px]:shadow-lg'
      )}
    >
      <TasksInfo tasksCount={tasks?.length} />

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {tasks?.length === 0 ? (
          <p className="py-4 opacity-90 text-sm text-center">
            Nenhuma tarefa para hoje. <br /> Que tal adicionar uma para começar?
          </p>
        ) : (
          tasks?.map(task => {
            return <Task key={task.id} id={task.id} completed={task.completed} title={task.title} priority={task.priority} />;
          })
        )}

        <div className="p-3 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
          <AddTaskDialog />
          <RemoveTasksButton tasksCount={tasks?.length ?? 0} />
        </div>
      </div>
    </div>
  );
}
