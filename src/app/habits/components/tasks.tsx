import { Task } from './task';
import { TasksInfo } from './tasks-info';
import { AddTaskDialog } from './add-task-dialog';
import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';
import { cn } from '@/lib/utils';

export interface TasksResponse {
  tasks: {
    id: string;
    title: string;
    priority: string;
    completed: boolean;
  }[];
}

export async function Tasks() {
  const { getToken } = auth();
  const token = await getToken();

  const tasksResponse = await api('/tasks', {
    next: {
      revalidate: 3600,
      tags: ['get-tasks'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { tasks }: TasksResponse = await tasksResponse.json();

  return (
    <div
      className={cn('w-full md:max-w-sm mt-6', 'bg-white dark:bg-background', 'border border-border', 'rounded-2xl shadow-lg')}
    >
      <TasksInfo tasksCount={tasks?.length} />

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {tasks?.length === 0 ? (
          <p className="py-4 opacity-90 text-sm text-center">
            Nenhuma tarefa para hoje. <br /> Que tal adicionar uma para começar?
          </p>
        ) : (
          tasks.map(task => {
            return <Task key={task.id} id={task.id} completed={task.completed} title={task.title} priority={task.priority} />;
          })
        )}

        <AddTaskDialog />
      </div>
    </div>
  );
}
