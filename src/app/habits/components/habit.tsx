'use client';

import { removeHabit } from '@/app/actions';
import { Checkboxes } from './checkboxes';
import { TitleEditor } from './title-editor';
import { UserActionsMenu } from './user-actions-menu';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useHabit } from '@/hooks/use-habit';

interface HabitProps {
  id: string;
  title: string;
}

export function Habit({ id, title }: HabitProps) {
  const { isTitleEditing, handleHabitTitleUpdate, startEditing } = useHabit({ id });

  return (
    <li className="flex items-center justify-between gap-10">
      <div className="group flex items-center min-w-32">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isTitleEditing ? (
              <TitleEditor title={title} onTitleSave={handleHabitTitleUpdate} isHabitTitle={true} />
            ) : (
              <h2 className="text-start truncate hover:text-foreground/85 cursor-pointer transition-colors">{title}</h2>
            )}
          </DropdownMenuTrigger>

          <UserActionsMenu onRename={startEditing} onRemove={() => removeHabit(id)} />
        </DropdownMenu>
      </div>

      <Checkboxes habitId={id} />
    </li>
  );
}
