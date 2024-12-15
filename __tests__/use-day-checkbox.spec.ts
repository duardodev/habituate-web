import { toggleHabit } from '@/app/actions';
import { useDayCheckbox } from '@/hooks/use-day-checkbox';
import { useHabitContext } from '@/hooks/use-habit-context';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { renderHook, act } from '@testing-library/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

jest.mock('../src/app/actions', () => ({
  toggleHabit: jest.fn(),
}));

jest.mock('../src/store/completed-days-store', () => ({
  useCompletedDaysStore: jest.fn(),
}));

jest.mock('../src/hooks/use-habit-context', () => ({
  useHabitContext: jest.fn(),
}));

describe('useDayCheckbox hook', () => {
  const mockSetCompletedDay = jest.fn();
  const habitId = 'habit-1';

  beforeEach(() => {
    jest.clearAllMocks();

    (useHabitContext as jest.Mock).mockReturnValue({ id: habitId });

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      completedDays: {},
      setCompletedDay: mockSetCompletedDay,
    });
  });

  it('should return correct initial values', () => {
    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay: dayjs() }));

    expect(result.current.isChecked).toBe(false);
    expect(result.current.isDisabled).toBe(false);
    expect(typeof result.current.handleHabitToggle).toBe('function');
  });

  it('should disable checkbox for future dates', () => {
    const futureDate = dayjs().add(1, 'day');
    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay: futureDate }));

    expect(result.current.isDisabled).toBe(true);
  });

  it('should mark checkbox as checked for completed days', () => {
    const completedDate = dayjs().subtract(1, 'day');
    const completedDateString = dayjs(completedDate).utcOffset(-3).startOf('day').toISOString();

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      completedDays: { [habitId]: [completedDateString] },
      setCompletedDay: jest.fn(),
    });

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay: completedDate }));

    expect(result.current.isChecked).toBe(true);
  });

  it('should handle habit toggle correctly', async () => {
    const currentDate = dayjs();
    const dateString = dayjs(currentDate).utcOffset(-3).startOf('day').toISOString();

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay: currentDate }));

    await act(async () => {
      await result.current.handleHabitToggle(dateString);
    });

    expect(mockSetCompletedDay).toHaveBeenCalledWith(habitId, dateString);
    expect(toggleHabit).toHaveBeenCalledWith(habitId, dateString);
  });
});
