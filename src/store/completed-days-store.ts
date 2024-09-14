import { create } from 'zustand';

interface CompletedDaysStore {
  completedDays: { [habitId: string]: string[] };
  setCompletedDay: (habitId: string, date: string) => void;
  setCompletedDays: (habitId: string, dates: string[]) => void;
}

export const useCompletedDaysStore = create<CompletedDaysStore>(set => ({
  completedDays: {},
  setCompletedDays: (habitId, dates) =>
    set(prevState => ({
      completedDays: {
        ...prevState.completedDays,
        [habitId]: dates,
      },
    })),
  setCompletedDay: (habitId, date) =>
    set(prevState => ({
      completedDays: {
        ...prevState.completedDays,
        [habitId]: prevState.completedDays[habitId]?.includes(date)
          ? prevState.completedDays[habitId].filter(d => d !== date)
          : [...(prevState.completedDays[habitId] || []), date],
      },
    })),
}));
