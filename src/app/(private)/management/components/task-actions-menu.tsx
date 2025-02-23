'use client';

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, X } from 'lucide-react';
import { UserActionsMenu } from './user-actions-menu';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTasksStore } from '@/store/tasks-store';
import { useActiveTaskEditingContext } from '@/hooks/use-active-task-editing-context';
import { useTaskActionsMenu } from '@/hooks/use-task-actions-menu';

export function TaskActionsMenu() {
  const { id } = useTaskContext();
  const { isTitleEditing } = useTaskActionsMenu(id);
  const { handleToggleTaskEditing } = useActiveTaskEditingContext();
  const removeTask = useTasksStore(state => state.removeTask);

  if (isTitleEditing) {
    return (
      <button role="button" type="button" aria-label="Disable editing" onClick={() => handleToggleTaskEditing(id)}>
        <X className="w-5 h-5 text-zinc-400" />
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Open the task actions menu">
          <MoreHorizontal className="w-5 h-5 text-zinc-400" />
        </button>
      </DropdownMenuTrigger>

      <UserActionsMenu onRename={() => handleToggleTaskEditing(id)} onRemove={() => removeTask(id)} />
    </DropdownMenu>
  );
}
