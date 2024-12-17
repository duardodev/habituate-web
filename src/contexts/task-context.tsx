'use client';

import { createContext, ReactNode } from 'react';

interface TaskContextType {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
}

export const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: ReactNode;
  task: TaskContextType;
}

export function TaskProvider({ children, task }: TaskProviderProps) {
  return <TaskContext.Provider value={task}>{children}</TaskContext.Provider>;
}
