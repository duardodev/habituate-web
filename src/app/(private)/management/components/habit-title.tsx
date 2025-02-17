'use client';

import { TitleEditor } from './title-editor';
import { UserActionsMenu } from './user-actions-menu';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useHabitContext } from '@/hooks/use-habit-context';
import { useHabitTitle } from '@/hooks/use-habit-title';
import { useTitleWidth } from '@/hooks/use-title-width';

export function HabitTitle() {
  const { isTitleEditing, handleHabitTitleUpdate, handleRemoveHabit, startEditing } = useHabitTitle();
  const { title } = useHabitContext();
  const { titleRef, titleWidth } = useTitleWidth({ isTitleEditing, title });

  return (
    <div className="group flex items-center">
      {isTitleEditing ? (
        <TitleEditor title={title} titleWidth={titleWidth} onTitleSave={handleHabitTitleUpdate} />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2
              role="button"
              tabIndex={0}
              ref={titleRef}
              className="max-w-96 text-start truncate hover:text-foreground/85 cursor-pointer transition-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded"
            >
              {title}
            </h2>
          </DropdownMenuTrigger>
          <UserActionsMenu onRename={startEditing} onRemove={handleRemoveHabit} />
        </DropdownMenu>
      )}
    </div>
  );
}
