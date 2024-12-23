import { useHabitsMetric } from '@/hooks/use-habits-metric';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useQuery } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

jest.mock('@/store/completed-days-store', () => ({
  useCompletedDaysStore: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('dayjs', () => {
  const mockDayjs = jest.fn(() => ({
    utcOffset: () => ({
      startOf: () => ({
        toISOString: () => '2024-12-23T00:00:00.000Z',
      }),
    }),
  }));

  return mockDayjs;
});

describe('useHabitsMetric hook', () => {
  const mockToday = '2024-12-23T00:00:00.000Z';

  beforeEach(() => {
    jest.clearAllMocks();

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      completedDays: {},
    });

    (useQuery as jest.Mock).mockReturnValue({
      data: {
        habits: [{ id: 'habit-1' }, { id: 'habit-2' }, { id: 'habit-3' }],
      },
      isLoading: false,
      isError: false,
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
        isLoading: false,
        isError: false,
      });
    });
  });

  it('should calculate correctly when all tasks completed', async () => {
    const mockCompletedDays = {
      'habit-1': [mockToday],
      'habit-2': [mockToday],
      'habit-3': ['2024-12-22T00:00:00.000Z'],
    };

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      completedDays: mockCompletedDays,
    });

    const { result } = renderHook(() => useHabitsMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedHabitsCount: 2,
        percentage: 66.66666666666666,
        isLoading: false,
        isError: false,
      });
    });
  });

  it('should return zero values when no habits completed', async () => {
    const { result } = renderHook(() => useHabitsMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedHabitsCount: 0,
        percentage: 0,
        isLoading: false,
        isError: false,
      });
    });
  });
});
