'use client';

import { Task } from './task';
import { TasksInfo } from './tasks-info';
import { AddTaskDialog } from './add-task-dialog';
import { RemoveTasksButton } from './remove-tasks-button';
import { useTasksStore } from '@/store/use-tasks-store';

export function Tasks() {
  const tasks = useTasksStore(state => state.tasks);

  return (
    <div className="bg-white dark:bg-background w-full md:max-w-sm border border-border rounded-2xl shadow-lg">
      <TasksInfo />

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
          <RemoveTasksButton />
        </div>
      </div>
    </div>
  );
}
