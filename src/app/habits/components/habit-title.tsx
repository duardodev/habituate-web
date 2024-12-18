'use client';

import { useState } from 'react';
import { TitleEditor } from './title-editor';
import { UserActionsMenu } from './user-actions-menu';
import { removeHabit, updateHabit } from '@/app/actions';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useHabitContext } from '@/hooks/use-habit-context';
import { useQueryClient } from '@tanstack/react-query';

export function HabitTitle() {
  const { id, title } = useHabitContext();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const queryClient = useQueryClient();

  function handleHabitTitleUpdate(newTitle: string) {
    updateHabit(id, newTitle);
    setIsTitleEditing(false);
  }

  async function handleRemoveHabit() {
    await removeHabit(id);
    queryClient.invalidateQueries({ queryKey: ['get-habits'] });
  }

  const startEditing = () => setIsTitleEditing(true);

  return (
    <div className="group flex items-center min-w-32">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isTitleEditing ? (
            <TitleEditor title={title} onTitleSave={handleHabitTitleUpdate} isHabitTitle={true} />
          ) : (
            <h2 className="text-start truncate hover:text-foreground/85 cursor-pointer transition-colors">{title}</h2>
          )}
        </DropdownMenuTrigger>

        <UserActionsMenu onRename={startEditing} onRemove={handleRemoveHabit} />
      </DropdownMenu>
    </div>
  );
}
