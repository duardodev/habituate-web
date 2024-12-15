import { render, screen } from '@testing-library/react';
import { Checkboxes } from '@/app/habits/components/checkboxes';
import { useCompletedDaysStore } from '@/store/completed-days-store';
import { useCurrentWeekDays } from '@/hooks/use-current-week-days';
import { useHabitContext } from '@/hooks/use-habit-context';

jest.mock('../src/store/completed-days-store');
jest.mock('../src/hooks/use-current-week-days');
jest.mock('../src/hooks/use-habit-context');

jest.mock('../src/app/habits/components/day-checkbox', () => ({
  DayCheckbox: ({
    habitId,
    currentWeekDay,
    'data-testid': dataTestId,
  }: {
    habitId: string;
    currentWeekDay: Date;
    'data-testid': string;
  }) => (
    <div data-testid={dataTestId}>
      Checkbox for {habitId} on {currentWeekDay.toISOString()}
    </div>
  ),
}));

describe('Checkboxes component', () => {
  const mockSetCompletedDays = jest.fn();
  const mockCurrentWeekDays = [new Date('2024-12-05'), new Date('2024-12-04'), new Date('2024-12-03')];
  const mockHabitId = 'habit-1';

  beforeEach(() => {
    (useCompletedDaysStore as unknown as jest.Mock).mockReturnValue({
      setCompletedDays: mockSetCompletedDays,
    });

    (useCurrentWeekDays as jest.Mock).mockReturnValue({
      currentWeekDays: mockCurrentWeekDays,
    });

    (useHabitContext as jest.Mock).mockReturnValue({
      id: mockHabitId,
    });
  });

  it('should render checkboxes for each day of the week', () => {
    render(<Checkboxes datesTheHabitWasCompleted={[]} />);

    mockCurrentWeekDays.forEach(day => {
      expect(screen.getByTestId(`day-checkbox-${day.toISOString()}`)).toBeInTheDocument();
    });
  });

  it('should call setCompletedDays with correct arguments on mount', () => {
    const mockDates = ['2024-12-03', '2024-12-04'];
    render(<Checkboxes datesTheHabitWasCompleted={mockDates} />);
    expect(mockSetCompletedDays).toHaveBeenCalledWith(mockHabitId, mockDates);
  });
});
