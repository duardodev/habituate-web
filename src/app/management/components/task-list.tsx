'use client';

import { Task } from './task';
import { TaskSkeleton } from './task-skeleton';
import { useTasksStore } from '@/store/tasks-store';
import { useLoading } from '@/hooks/use-loading';
import { TaskProvider } from '@/contexts/task-context';

export function TaskList() {
  const tasks = useTasksStore(state => state.tasks);
  const { isLoading } = useLoading();

  if (isLoading) {
    return <TaskSkeleton />;
  }

  return (
    <>
      {tasks && tasks.length === 0 ? (
        <p className="py-4 opacity-90 text-sm text-center">
          Nenhuma tarefa para hoje. <br /> Que tal adicionar uma para começar?
        </p>
      ) : (
        tasks.map(task => {
          return (
            <TaskProvider
              key={task.id}
              task={{
                id: task.id,
                title: task.title,
                completed: task.completed,
                priority: task.priority,
              }}
            >
              <Task />
            </TaskProvider>
          );
        })
      )}
    </>
  );
}
