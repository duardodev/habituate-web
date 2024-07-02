import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

interface DateStore {
  currentDate: Dayjs;
  setNewCurrentDate: (newDate: Dayjs) => void;
}

export const useDateStore = create<DateStore>(set => ({
  currentDate: dayjs().utc(),
  setNewCurrentDate: newDate => set({ currentDate: newDate }),
}));
