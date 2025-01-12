'use client';

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { UserActionsMenu } from './user-actions-menu';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTasksStore } from '@/store/tasks-store';
import { useTaskActionsMenu } from '@/hooks/use-task-actions-menu';
import { useActiveTaskEditingContext } from '@/hooks/use-active-task-editing';

export function TaskActionsMenu() {
  const { id } = useTaskContext();
  const { isTitleEditing } = useTaskActionsMenu(id);
  const { handleToggleTaskEditing } = useActiveTaskEditingContext();
  const removeTask = useTasksStore(state => state.removeTask);

  if (isTitleEditing) {
    return;
  }

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

      <UserActionsMenu onRename={() => handleToggleTaskEditing(id)} onRemove={() => removeTask(id)} />
    </DropdownMenu>
  );
}
