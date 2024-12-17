'use client';

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { UserActionsMenu } from './user-actions-menu';
import { useTaskTitleStore } from '@/store/use-task-title-store';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTasksStore } from '@/store/use-tasks-store';

export function TaskActionsMenu() {
  const { id } = useTaskContext();
  const { setIsTitleEditing } = useTaskTitleStore();
  const removeTask = useTasksStore(state => state.removeTask);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="opacity-100 lg:opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="w-5 h-5 text-zinc-400" />
        </button>
      </DropdownMenuTrigger>

      <UserActionsMenu onRename={setIsTitleEditing} onRemove={() => removeTask(id)} />
    </DropdownMenu>
  );
}
