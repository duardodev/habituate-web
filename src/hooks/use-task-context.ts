import { TaskContext } from '@/contexts/task-context';
import { useContext } from 'react';

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useHabitContext must be used within a TaskProvider');
  }

  return context;
}
