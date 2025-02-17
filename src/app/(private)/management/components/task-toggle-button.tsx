'use client';

import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskToggleButton } from '@/hooks/use-task-toggle-button';
import { CheckCircle2, Circle } from 'lucide-react';

export function TaskToggleButton() {
  const { completed, title } = useTaskContext();
  const { handleTaskToggle } = useTaskToggleButton();

  return (
    <button
      type="submit"
      onClick={e => handleTaskToggle(e)}
      className="flex-none transition-all"
      aria-label={`Task "${title}" marked as ${completed ? 'complete' : 'incomplete'}`}
    >
      {completed ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      ) : (
        <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
      )}
    </button>
  );
}
