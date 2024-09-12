import { useDateStore } from '@/store/date-store';

export const useCurrentWeekDays = () => {
  const { currentDate } = useDateStore();
  const currentWeekDays = Array.from({ length: 7 }, (_, i) =>
    currentDate.startOf('week').add(i, 'day')
  );

  return {
    currentWeekDays,
  };
};
