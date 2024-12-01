'use client';

import { Input } from '@/components/ui/input';
import { useTitleEditor } from '@/hooks/use-title-editor';
import { cn } from '@/lib/utils';

interface TitleEditorProps {
  title: string;
  onTitleSave: (newTitle: string) => void;
  isHabitTitle?: boolean;
}

export function TitleEditor({ title, onTitleSave, isHabitTitle }: TitleEditorProps) {
  const { handleTitleChange, saveTitle, temporaryTitle } = useTitleEditor({
    title,
    onTitleSave,
  });

  return (
    <Input
      type="text"
      value={temporaryTitle}
      className={cn('w-32 h-5 py-3 focus-visible:ring-transparent', isHabitTitle && 'text-base')}
      onChange={handleTitleChange}
      onBlur={saveTitle}
      autoFocus={process.env.NODE_ENV === 'production'}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          saveTitle();
        }
      }}
    />
  );
}
