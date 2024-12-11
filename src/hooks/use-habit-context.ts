import { HabitContext } from '@/contexts/habit-context';
import { useContext } from 'react';

export function useHabitContext() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error('useHabitContext must be used within a HabitProvider');
  }

  return context;
}
