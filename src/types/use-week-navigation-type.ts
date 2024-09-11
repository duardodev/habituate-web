export interface UseWeekNavigationType {
  handleGoToPreviousWeek: () => void;
  handleGoToNextWeek: () => void;
  currentDate: {
    isToday: () => boolean;
  };
}
