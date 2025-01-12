import { TaskTitle } from './task-title';
import { TaskToggleButton } from './task-toggle-button';
import { TaskPriority } from './task-priority';
import { TaskActionsMenu } from './task-actions-menu';
import { ActiveTaskEditingProvider } from '@/contexts/active-task-editing';

export function Task() {
  return (
    <div className="p-4 flex items-center gap-3 group">
      <TaskToggleButton />

      <ActiveTaskEditingProvider>
        <div className="flex-1 flex gap-3 min-w-0">
          <TaskPriority />
          <TaskTitle />
        </div>

        <TaskActionsMenu />
      </ActiveTaskEditingProvider>
    </div>
  );
}
