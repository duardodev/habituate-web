import { renderHook, act } from '@testing-library/react';
import { useDayCheckbox } from '@/hooks/use-day-checkbox';
import { useHabitContext } from '@/hooks/use-habit-context';
import { useDateStore } from '@/store/date-store';
import { toggleHabit } from '@/app/actions/habit-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

jest.mock('@/hooks/use-habit-context');
jest.mock('@/store/date-store');
jest.mock('@/app/actions/habit-actions');
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

describe('useDayCheckbox', () => {
  const habitId = 'test-habit-id';
  const today = dayjs();
  const queryClient = {
    getQueryData: jest.fn(),
    setQueryData: jest.fn(),
    cancelQueries: jest.fn(),
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useHabitContext as jest.Mock).mockReturnValue({ id: habitId });
    (useDateStore as unknown as jest.Mock).mockReturnValue({ today });
    (useQueryClient as jest.Mock).mockReturnValue(queryClient);
    (toggleHabit as jest.Mock).mockResolvedValue(undefined);

    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
      isSuccess: false,
    });
  });

  it('should return correct initial states', () => {
    const currentWeekDay = today;
    queryClient.getQueryData.mockReturnValue([]);

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay }));

    expect(result.current.isChecked).toBe(false);
    expect(result.current.isDisabled).toBe(false);
    expect(typeof result.current.handleHabitToggle).toBe('function');
  });

  it('should mark day as checked if date is in completed dates', () => {
    const currentWeekDay = today;
    const dateString = currentWeekDay.startOf('day').utc().toISOString();
    queryClient.getQueryData.mockReturnValue([dateString]);

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay }));

    expect(result.current.isChecked).toBe(true);
  });

  it('should disable checkbox for future dates', () => {
    const futureDate = today.add(1, 'day');
    queryClient.getQueryData.mockReturnValue([]);

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay: futureDate }));

    expect(result.current.isDisabled).toBe(true);
  });

  it('should add date when toggling uncompleted date', async () => {
    const currentWeekDay = today;
    const dateString = currentWeekDay.startOf('day').utc().toISOString();
    const previousCompletedDates: string[] = [];

    (useMutation as jest.Mock).mockImplementation(({ onMutate }) => ({
      mutate: async (date: string) => {
        await onMutate(date);
      },
    }));

    queryClient.getQueryData.mockReturnValue(previousCompletedDates);

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay }));

    await act(async () => {
      await result.current.handleHabitToggle(dateString);
    });

    expect(queryClient.setQueryData).toHaveBeenCalledWith(['completed-dates-for-habit', habitId], expect.any(Function));

    const setQueryDataCall = queryClient.setQueryData.mock.calls[0];
    const updateCompletedDatesFunction = setQueryDataCall[1];
    const updatedCompletedDates = updateCompletedDatesFunction(previousCompletedDates);
    expect(updatedCompletedDates).toEqual([dateString]);
  });

  it('should remove date when toggling completed date', async () => {
    const currentWeekDay = today;
    const dateString = currentWeekDay.startOf('day').utc().toISOString();
    const previousCompletedDates = [dateString];

    (useMutation as jest.Mock).mockImplementation(({ onMutate }) => ({
      mutate: async (date: string) => {
        await onMutate(date);
      },
    }));

    queryClient.getQueryData.mockReturnValue(previousCompletedDates);

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay }));

    await act(async () => {
      await result.current.handleHabitToggle(dateString);
    });

    expect(queryClient.setQueryData).toHaveBeenCalledWith(['completed-dates-for-habit', habitId], expect.any(Function));

    const setQueryDataCall = queryClient.setQueryData.mock.calls[0];
    const updateCompletedDatesFunction = setQueryDataCall[1];
    const updatedCompletedDates = updateCompletedDatesFunction(previousCompletedDates);
    expect(updatedCompletedDates).toEqual([]);
  });

  it('should handle mutation with optimistic updates', async () => {
    const currentWeekDay = today;
    const dateString = currentWeekDay.startOf('day').utc().toISOString();
    const previousCompletedDates: string[] = [];

    (useMutation as jest.Mock).mockImplementation(options => ({
      mutate: async (date: string) => {
        const context = await options.onMutate(date);
        await options.onSuccess?.(undefined, date, context);
        await options.onSettled?.(undefined, null, date);
      },
    }));

    queryClient.getQueryData.mockReturnValue(previousCompletedDates);

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay }));

    await act(async () => {
      await result.current.handleHabitToggle(dateString);
    });

    expect(queryClient.cancelQueries).toHaveBeenCalledWith({
      queryKey: ['completed-dates-for-habit', habitId],
    });
    expect(queryClient.setQueryData).toHaveBeenCalled();
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['completed-dates-for-habit', habitId],
    });
  });

  it('should handle error and revert optimistic update', async () => {
    const currentWeekDay = today;
    const dateString = currentWeekDay.startOf('day').utc().toISOString();
    const previousCompletedDates = [dateString];

    (useMutation as jest.Mock).mockImplementation(options => ({
      mutate: async (date: string) => {
        const context = await options.onMutate(date);
        await options.onError?.(new Error('Test error'), date, context);
        await options.onSettled?.(undefined, null, date);
      },
    }));

    queryClient.getQueryData.mockReturnValue(previousCompletedDates);

    const { result } = renderHook(() => useDayCheckbox({ currentWeekDay }));

    await act(async () => {
      await result.current.handleHabitToggle(dateString);
    });

    expect(queryClient.setQueryData).toHaveBeenCalledWith(
      ['completed-dates-for-habit', habitId],
      previousCompletedDates
    );
    expect(queryClient.invalidateQueries).toHaveBeenCalled();
  });
});
