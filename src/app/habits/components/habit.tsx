'use client';

import { Checkboxes } from './checkboxes';
import { HabitTitleInput } from './habit-title-input';
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
              <HabitTitleInput title={title} onTitleSave={handleHabitTitleUpdate} />
            ) : (
              <h2 className="text-start truncate hover:text-foreground/85 cursor-pointer transition-colors">
                {title}
              </h2>
            )}
          </DropdownMenuTrigger>

          <UserActionsMenu habitId={id} onRename={startEditing} />
        </DropdownMenu>
      </div>

      <Checkboxes habitId={id} />
    </li>
  );
}
