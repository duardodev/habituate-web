import { useHabitsMetric } from '@/hooks/use-habits-metric';
import { useHabitsQuery } from '@/hooks/use-habits-query';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useDateStore } from '@/store/date-store';
import { renderHook, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

jest.mock('@/store/completed-days-store', () => ({
  useCompletedDaysStore: jest.fn(),
}));

jest.mock('@/hooks/use-habits-query', () => ({
  useHabitsQuery: jest.fn(),
}));

jest.mock('@/store/date-store', () => ({
  useDateStore: jest.fn(),
}));

describe('useHabitsMetric hook', () => {
  const mockToday = '2025-01-05T00:00:00.000Z';
  const mockCurrentDate = dayjs('2025-01-05').utc();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      completedDays: {},
    });

    (useHabitsQuery as jest.Mock).mockReturnValue({
      data: {
        habits: [{ id: 'habit-1' }, { id: 'habit-2' }, { id: 'habit-3' }],
      },
    });

    (useDateStore as unknown as jest.Mock).mockReturnValue({
      currentDate: mockCurrentDate,
    });
  });

  it('should calculate all completed habits', async () => {
    const mockCompletedDays = {
      'habit-1': [mockToday],
      'habit-2': [mockToday],
      'habit-3': [mockToday],
    };

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      completedDays: mockCompletedDays,
    });

    const { result } = renderHook(() => useHabitsMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedHabitsCount: 3,
        percentage: 100,
      });
    });
  });

  it('should calculate correctly when all tasks completed', async () => {
    const mockCompletedDays = {
      'habit-1': [mockToday],
      'habit-2': [mockToday],
      'habit-3': ['2025-01-04T00:00:00.000Z'],
    };

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      completedDays: mockCompletedDays,
    });

    const { result } = renderHook(() => useHabitsMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedHabitsCount: 2,
        percentage: 66.66666666666666,
      });
    });
  });

  it('should return zero values when no habits completed', async () => {
    const { result } = renderHook(() => useHabitsMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedHabitsCount: 0,
        percentage: 0,
      });
    });
  });

  it('should handle undefined habits data', async () => {
    (useHabitsQuery as jest.Mock).mockReturnValue({
      data: undefined,
    });

    const { result } = renderHook(() => useHabitsMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedHabitsCount: 0,
        percentage: 0,
      });
    });
  });
});
