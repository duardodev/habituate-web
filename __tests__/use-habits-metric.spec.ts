import { useHabitsMetric } from '@/hooks/use-habits-metric';
import { useHabitsQuery } from '@/hooks/use-habits-query';
import { useDateStore } from '@/store/date-store';
import { useQueries } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

jest.mock('@/hooks/use-habits-query', () => ({
  useHabitsQuery: jest.fn(),
}));

jest.mock('@/store/date-store', () => ({
  useDateStore: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueries: jest.fn(() => []),
}));

describe('useHabitsMetric hook', () => {
  const mockTodayDate = '2025-01-05T00:00:00.000Z';
  const mockToday = dayjs('2025-01-05').startOf('day').utc();

  beforeEach(() => {
    jest.clearAllMocks();

    (useHabitsQuery as jest.Mock).mockReturnValue({
      data: {
        habits: [{ id: 'habit-1' }, { id: 'habit-2' }, { id: 'habit-3' }],
      },
    });

    (useQueries as jest.Mock).mockReturnValue([]);

    (useDateStore as unknown as jest.Mock).mockReturnValue({
      today: mockToday,
    });
  });

  it('should calculate all completed habits', async () => {
    (useQueries as jest.Mock).mockReturnValue([
      { data: [mockTodayDate] },
      { data: [mockTodayDate] },
      { data: [mockTodayDate] },
    ]);

    const { result } = renderHook(() => useHabitsMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedHabitsCount: 3,
        percentage: 100,
      });
    });
  });

  it('should calculate correctly when all tasks completed', async () => {
    (useQueries as jest.Mock).mockReturnValue([
      { data: [mockTodayDate] },
      { data: [mockTodayDate] },
      { data: ['2025-01-04T00:00:00.000Z'] },
    ]);

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
