'use client';

import { Task } from './task';
import { TaskSkeleton } from './task-skeleton';
import { useTasksStore } from '@/store/use-tasks-store';
import { useLoading } from '@/hooks/use-loading';

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
          return <Task key={task.id} id={task.id} completed={task.completed} title={task.title} priority={task.priority} />;
        })
      )}
    </>
  );
}
