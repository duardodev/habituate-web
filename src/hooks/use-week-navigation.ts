import { useDateStore } from '@/store/date-store';

export function useWeekNavigation() {
  const { currentDate, setNewCurrentDate } = useDateStore();

  function handleGoToPreviousWeek() {
    setNewCurrentDate(currentDate.subtract(1, 'week'));
  }

  function handleGoToNextWeek() {
    setNewCurrentDate(currentDate.add(1, 'week'));
  }

  return {
    currentDate,
    handleGoToNextWeek,
    handleGoToPreviousWeek,
  };
}
