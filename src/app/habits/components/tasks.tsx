import { TasksInfo } from './tasks-info';
import { AddTaskDialog } from './add-task-dialog';
import { RemoveTasksButton } from './remove-tasks-button';
import { TaskList } from './task-list';

export function Tasks() {
  return (
    <div className="bg-white dark:bg-background w-full md:max-w-sm border border-border rounded-2xl shadow-lg">
      <TasksInfo />

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        <TaskList />

        <div className="p-3 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
          <AddTaskDialog />
          <RemoveTasksButton />
        </div>
      </div>
    </div>
  );
}
