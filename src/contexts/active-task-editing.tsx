import { createContext, ReactNode, useState } from 'react';

interface ActiveTaskEditingType {
  activeTaskEditingId: string | null;
  handleToggleTaskEditing: (taskId: string) => void;
}

export const ActiveTaskEditingContext = createContext<ActiveTaskEditingType | null>(null);

interface ActiveTaskEditingProviderProps {
  children: ReactNode;
}

export function ActiveTaskEditingProvider({ children }: ActiveTaskEditingProviderProps) {
  const [activeTaskEditingId, setActiveTaskEditingId] = useState<string | null>(null);

  function handleToggleTaskEditing(taskId: string) {
    setActiveTaskEditingId(prevState => (prevState === taskId ? null : taskId));
  }

  return (
    <ActiveTaskEditingContext.Provider value={{ activeTaskEditingId, handleToggleTaskEditing }}>
      {children}
    </ActiveTaskEditingContext.Provider>
  );
}
