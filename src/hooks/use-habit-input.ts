import { useState } from 'react';

interface useHabitInputProps {
  title: string;
  onTitleSave: (newTitle: string) => void;
}

export function useHabitInput({ title, onTitleSave }: useHabitInputProps) {
  const [temporaryTitle, setTemporaryTitle] = useState(title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemporaryTitle(e.target.value);
  };

  const saveTitle = () => {
    if (temporaryTitle.trim() === '') {
      setTemporaryTitle(title);
    } else {
      onTitleSave(temporaryTitle);
    }
  };

  return {
    temporaryTitle,
    handleTitleChange,
    saveTitle,
  };
}
