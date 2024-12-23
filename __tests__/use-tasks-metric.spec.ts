import { useTasksMetric } from '@/hooks/use-tasks-metric';
import { useTasksStore } from '@/store/use-tasks-store';
import { renderHook, waitFor } from '@testing-library/react';

jest.mock('@/store/use-tasks-store', () => ({
  useTasksStore: jest.fn(),
}));

describe('useTasksMetric hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate correctly', async () => {
    (useTasksStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        amountCompletedTasks: () => 10,
        amountTasks: () => 10,
      };

      return selector(state);
    });

    const { result } = renderHook(() => useTasksMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedTasksCount: 10,
        percentage: 100,
      });
    });
  });

  it('should return zero values when no tasks', async () => {
    (useTasksStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        amountCompletedTasks: () => 0,
        amountTasks: () => 0,
      };

      return selector(state);
    });

    const { result } = renderHook(() => useTasksMetric());

    await waitFor(() => {
      expect(result.current).toEqual({
        completedTasksCount: 0,
        percentage: 0,
      });
    });
  });
});
