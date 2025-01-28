'use client';

import { Input } from '@/components/ui/input';
import { useTitleEditor } from '@/hooks/use-title-editor';
import { cn } from '@/lib/utils';

interface TitleEditorProps {
  title: string;
  onTitleSave: (newTitle: string) => void;
  isHabitTitle?: boolean;
  titleWidth: number;
}

export function TitleEditor({ title, onTitleSave, titleWidth, isHabitTitle }: TitleEditorProps) {
  const { handleTitleChange, saveTitle, temporaryTitle } = useTitleEditor({
    title,
    onTitleSave,
  });

  return (
    <Input
      type="text"
      value={temporaryTitle}
      className={cn('w-4 h-5 py-3 pl-2 pr-0 focus-visible:ring-transparent', isHabitTitle && 'text-base')}
      style={{
        width: `${titleWidth}px`,
      }}
      onChange={handleTitleChange}
      onBlur={saveTitle}
      autoFocus={process.env.NEXT_PUBLIC_MODE === 'production'}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          saveTitle();
        }
      }}
    />
  );
}
