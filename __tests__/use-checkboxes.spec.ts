import { renderHook, waitFor } from '@testing-library/react';
import { useCheckboxes } from '@/hooks/use-checkboxes';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useCurrentWeekDays } from '../src/hooks/use-current-week-days';

jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../src/store/completed-days-store', () => ({
  useCompletedDaysStore: jest.fn(),
}));

jest.mock('../src/hooks/use-current-week-days', () => ({
  useCurrentWeekDays: jest.fn(),
}));

describe('useCheckboxes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set completed days', async () => {
    const mockCurrentWeekDays = [new Date('2024-09-25'), new Date('2024-09-26')];
    const mockCompletedDates = ['2024-09-25', '2024-09-26'];
    const mockHabitId = 'habit-123';
    const mockSetCompletedDays = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      getToken: jest.fn().mockReturnValue('mock-token'),
    });

    (useCurrentWeekDays as jest.Mock).mockReturnValue({
      currentWeekDays: mockCurrentWeekDays,
    });

    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      setCompletedDays: mockSetCompletedDays,
    });

    (useQuery as jest.Mock).mockReturnValue({
      data: mockCompletedDates,
      isSuccess: true,
    });

    const { result } = renderHook(() => useCheckboxes({ habitId: mockHabitId }));

    await waitFor(() => {
      expect(result.current.currentWeekDays).toEqual(mockCurrentWeekDays);
    });

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['days-with-specific-comleted-habit', mockHabitId],
      queryFn: expect.any(Function),
    });

    expect(mockSetCompletedDays).toHaveBeenCalledWith(mockHabitId, mockCompletedDates);
  });

  it('should handle errror when token is not available', async () => {
    const mockCurrentWeekDays = [new Date('2024-09-25'), new Date('2024-09-26')];
    const mockHabitId = 'habit-123';

    (useAuth as jest.Mock).mockReturnValue({
      getToken: jest.fn().mockReturnValue(null),
    });

    (useQuery as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error('Token not available'),
    });

    (useCurrentWeekDays as jest.Mock).mockReturnValue({
      currentWeekDays: mockCurrentWeekDays,
    });

    const { result } = renderHook(() => useCheckboxes({ habitId: mockHabitId }));

    await waitFor(() => {
      expect(result.current.currentWeekDays).toEqual(mockCurrentWeekDays);
    });

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['days-with-specific-comleted-habit', mockHabitId],
      queryFn: expect.any(Function),
    });
  });
});
