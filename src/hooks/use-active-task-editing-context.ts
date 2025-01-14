import { ActiveTaskEditingContext } from '@/contexts/active-task-editing';
import { useContext } from 'react';

export function useActiveTaskEditingContext() {
  const context = useContext(ActiveTaskEditingContext);

  if (!context) {
    throw new Error('ActiveTaskEditingContext must be used within a ActiveTaskEditingProvider');
  }

  return context;
}
