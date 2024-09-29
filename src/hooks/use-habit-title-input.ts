import { useState } from 'react';

interface useHabitInputProps {
  title: string;
  onTitleSave: (newTitle: string) => void;
}

export function useHabitTitleInput({ title, onTitleSave }: useHabitInputProps) {
  const [temporaryTitle, setTemporaryTitle] = useState(title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemporaryTitle(e.target.value);
  };

  const saveTitle = () => {
    const trimmedTitle = temporaryTitle.trim();
    if (trimmedTitle === '') {
      setTemporaryTitle(title);
    } else {
      onTitleSave(trimmedTitle);
    }
  };

  return {
    temporaryTitle,
    handleTitleChange,
    saveTitle,
  };
}
