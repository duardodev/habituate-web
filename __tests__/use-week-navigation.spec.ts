import { renderHook, act } from '@testing-library/react';
import { useDateStore } from '@/store/date-store';
import { useWeekNavigation } from '@/hooks/use-week-navigation';

jest.mock('../src/store/date-store', () => ({
  useDateStore: jest.fn(),
}));

describe('useWeekNavigation', () => {
  let mockSetNewCurrentDate: jest.Mock;
  let mockCurrentDate: { subtract: jest.Mock; add: jest.Mock };

  beforeEach(() => {
    mockSetNewCurrentDate = jest.fn();
    mockCurrentDate = {
      subtract: jest.fn().mockReturnValue('previous week date'),
      add: jest.fn().mockReturnValue('next week date'),
    };

    (useDateStore as unknown as jest.Mock).mockReturnValue({
      currentDate: mockCurrentDate,
      setNewCurrentDate: mockSetNewCurrentDate,
    });
  });

  it('should navigate to previous week', () => {
    const { result } = renderHook(() => useWeekNavigation());

    act(() => {
      result.current.handleGoToPreviousWeek();
    });

    expect(mockCurrentDate.subtract).toHaveBeenCalledWith(1, 'week');
    expect(mockSetNewCurrentDate).toHaveBeenCalledWith('previous week date');
  });

  it('should navigate to next week', () => {
    const { result } = renderHook(() => useWeekNavigation());

    act(() => {
      result.current.handleGoToNextWeek();
    });

    expect(mockCurrentDate.add).toHaveBeenCalledWith(1, 'week');
    expect(mockSetNewCurrentDate).toHaveBeenCalledWith('next week date');
  });
});