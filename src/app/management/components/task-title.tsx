'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TitleEditor } from './title-editor';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskTitle } from '@/hooks/use-task-title';
import { useTitleWidth } from '@/hooks/use-title-width';
import { cn } from '@/lib/utils';

export function TaskTitle() {
  const { title, completed } = useTaskContext();
  const { handleTaskTitleUpdate, isTitleEditing } = useTaskTitle();
  const { titleRef, titleWidth } = useTitleWidth({ isTitleEditing, title });

  return (
    <>
      {isTitleEditing ? (
        <TitleEditor title={title} titleWidth={titleWidth} onTitleSave={handleTaskTitleUpdate} />
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <h2
                ref={titleRef}
                className={cn(
                  'max-w-40 truncate',
                  completed ? 'text-zinc-400 dark:text-zinc-500 line-through' : 'text-zinc-900 dark:text-zinc-100'
                )}
              >
                {title}
              </h2>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
