import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

const DEFAULT_TIMEZONE = dayjs.tz.guess();

interface DateStore {
  currentDate: Dayjs;
  today: Dayjs;
  setNewCurrentDate: (newDate: Dayjs) => void;
}

export const useDateStore = create<DateStore>((set, get) => ({
  currentDate: dayjs().tz(DEFAULT_TIMEZONE),
  today: dayjs().tz(DEFAULT_TIMEZONE),
  setNewCurrentDate: (newDate: Dayjs) => {
    const tzDate = newDate.tz(DEFAULT_TIMEZONE);
    set({ currentDate: tzDate });
  },
}));
