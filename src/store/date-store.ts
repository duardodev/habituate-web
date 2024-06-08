import { create } from 'zustand';

import dayjs, { Dayjs } from 'dayjs';

interface DateStore {
  currentDate: Dayjs;
  setNewCurrentDate: (newDate: Dayjs) => void;
}

export const useDateStore = create<DateStore>(set => ({
  currentDate: dayjs().startOf('day'),
  setNewCurrentDate: newDate => set({ currentDate: newDate }),
}));
