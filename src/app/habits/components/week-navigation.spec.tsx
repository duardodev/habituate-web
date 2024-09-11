import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useWeekNavigation } from '@/hooks/use-week-navigation';
import { UseWeekNavigationType } from '@/types/use-week-navigation-type';
import { WeekNavigation } from './week-navigation';

jest.mock('../../../hooks/use-week-navigation', () => ({
  useWeekNavigation: jest.fn(),
}));

describe('WeekNavigation component', () => {
  const mockHandleGoToPreviousWeek = jest.fn();
  const mockHandleGoToNextWeek = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useWeekNavigation as jest.Mock).mockReturnValue({
      currentDate: {
        isToday: jest.fn().mockReturnValue(false),
      },
      handleGoToPreviousWeek: mockHandleGoToPreviousWeek,
      handleGoToNextWeek: mockHandleGoToNextWeek,
    } as UseWeekNavigationType);
  });

  it('should render navigation buttons', () => {
    render(<WeekNavigation />);

    expect(
      screen.getByRole('button', { name: /Navegar para semana anterior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Navegar para próxima semana/i })
    ).toBeInTheDocument();
  });

  it('should call handleGoToPreviuosWeek on clicking the previous week button', async () => {
    render(<WeekNavigation />);

    await userEvent.click(screen.getByRole('button', { name: /Navegar para semana anterior/i }));

    expect(mockHandleGoToPreviousWeek).toHaveBeenCalled();
  });

  it('should call handleGoToNextWeek on clicking the next week button', async () => {
    render(<WeekNavigation />);

    await userEvent.click(screen.getByRole('button', { name: /Navegar para próxima semana/i }));

    expect(mockHandleGoToNextWeek).toHaveBeenCalled();
  });

  it('should disable the next week button if currentDate.isToday() is true', () => {
    (useWeekNavigation as jest.Mock).mockReturnValue({
      handleGoToPreviousWeek: mockHandleGoToPreviousWeek,
      handleGoToNextWeek: mockHandleGoToNextWeek,
      currentDate: {
        isToday: jest.fn().mockReturnValue(true),
      },
    } as UseWeekNavigationType);

    render(<WeekNavigation />);

    expect(screen.getByRole('button', { name: /Navegar para próxima semana/i })).toBeDisabled();
  });

  it('should not disable the next week button if currentDate.isToday() is false', () => {
    render(<WeekNavigation />);

    expect(screen.getByRole('button', { name: /Navegar para próxima semana/i })).not.toBeDisabled();
  });
});
