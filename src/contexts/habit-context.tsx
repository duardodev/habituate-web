'use client';

import { createContext, ReactNode } from 'react';

interface HabitContextType {
  id: string;
  title: string;
  emoji: string | null;
}

export const HabitContext = createContext<HabitContextType | null>(null);

interface HabitProviderProps {
  children: ReactNode;
  habit: HabitContextType;
}

export function HabitProvider({ children, habit }: HabitProviderProps) {
  return <HabitContext.Provider value={habit}>{children}</HabitContext.Provider>;
}
