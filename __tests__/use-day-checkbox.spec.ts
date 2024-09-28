import { useDayCheckbox } from '@/hooks/use-day-checkbox';
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

const mockMutateAsync = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn().mockImplementation(({ onSuccess }) => ({
    mutateAsync: mockMutateAsync.mockImplementation(async () => {
      await Promise.resolve();
      onSuccess();
    }),
  })),
  useQueryClient: jest.fn().mockReturnValue({
    invalidateQueries: jest.fn(),
  }),
}));

describe('useDayCheckbox hook', () => {
  const mockSetCompletedDay = jest.fn();
  const mockInvalidateQueries = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.requireMock('../src/store/completed-days-store').useCompletedDaysStore.mockReturnValue({
      completedDays: {},
      setCompletedDay: mockSetCompletedDay,
    });

    jest.requireMock('@tanstack/react-query').useQueryClient.mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
  });

  it('should return correct initial values', () => {
    const { result } = renderHook(() => useDayCheckbox({ habitId: '1', currentWeekDay: dayjs() }));

    expect(result.current.isChecked).toBe(false);
    expect(result.current.isDisabled).toBe(false);
    expect(typeof result.current.handleHabitToggle).toBe('function');
  });

  it('should disable checkbox for future dates', () => {
    const futureDate = dayjs().add(1, 'day');
    const { result } = renderHook(() =>
      useDayCheckbox({ habitId: '1', currentWeekDay: futureDate })
    );

    expect(result.current.isDisabled).toBe(true);
  });

  it('should mark checkbox as checked for completed days', () => {
    const completedDate = dayjs().subtract(1, 'day');
    const completedDateString = dayjs.utc(completedDate).startOf('day').toISOString();

    jest.requireMock('../src/store/completed-days-store').useCompletedDaysStore.mockReturnValue({
      completedDays: { '1': [completedDateString] },
      setCompletedDay: jest.fn(),
    });

    const { result } = renderHook(() =>
      useDayCheckbox({ habitId: '1', currentWeekDay: completedDate })
    );

    expect(result.current.isChecked).toBe(true);
  });

  it('should handle habit toggle correctly', async () => {
    const currentDate = dayjs();
    const dateString = dayjs.utc(currentDate).startOf('day').toISOString();

    const { result } = renderHook(() =>
      useDayCheckbox({ habitId: '1', currentWeekDay: currentDate })
    );

    await act(async () => {
      await result.current.handleHabitToggle(dateString);
    });

    expect(mockSetCompletedDay).toHaveBeenCalledWith('1', dateString);
    expect(mockMutateAsync).toHaveBeenCalledWith(dateString);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['days-with-specific-completed-habit', '1'],
    });
  });
});
