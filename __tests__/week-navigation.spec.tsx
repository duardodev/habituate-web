import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useWeekNavigation } from '@/hooks/use-week-navigation';
import { WeekNavigation } from '../src/app/(private)/management/components/week-navigation';

jest.mock('../src/hooks/use-week-navigation', () => ({
  useWeekNavigation: jest.fn(),
}));

describe('WeekNavigation component', () => {
  const mockHandleGoToPreviousWeek = jest.fn();
  const mockHandleGoToNextWeek = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useWeekNavigation as jest.Mock).mockReturnValue({
      currentDate: { isToday: () => false },
      handleGoToPreviousWeek: mockHandleGoToPreviousWeek,
      handleGoToNextWeek: mockHandleGoToNextWeek,
    });
  });

  it('should render navigation buttons', () => {
    render(<WeekNavigation />);

    expect(screen.getByRole('button', { name: /Go to previous week/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to next week/i })).toBeInTheDocument();
  });

  it('shoud disable the next week button when current date is today', () => {
    (useWeekNavigation as jest.Mock).mockReturnValue({
      currentDate: { isToday: () => true },
      handleGoToNextWeek: jest.fn(),
      handleGoToPreviousWeek: jest.fn(),
    });

    render(<WeekNavigation />);

    expect(screen.getByRole('button', { name: /Go to next week/i })).toBeDisabled();
  });

  it('should call handleGoToPreviuosWeek on clicking the previous week button', async () => {
    render(<WeekNavigation />);

    await userEvent.click(screen.getByRole('button', { name: /Go to previous week/i }));

    expect(mockHandleGoToPreviousWeek).toHaveBeenCalled();
  });

  it('should call handleGoToNextWeek on clicking the next week button', async () => {
    render(<WeekNavigation />);

    await userEvent.click(screen.getByRole('button', { name: /Go to next week/i }));

    expect(mockHandleGoToNextWeek).toHaveBeenCalled();
  });
});
