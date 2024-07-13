import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(utc);
dayjs.extend(isToday);

interface DateStore {
  currentDate: Dayjs;
  setNewCurrentDate: (newDate: Dayjs) => void;
}

export const useDateStore = create<DateStore>(set => ({
  currentDate: dayjs(),
  setNewCurrentDate: newDate => set({ currentDate: newDate }),
}));
