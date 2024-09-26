import { render, screen } from '@testing-library/react';
import { Checkboxes } from '@/app/habits/components/checkboxes';
import { useCheckboxes } from '@/hooks/use-checkboxes';

jest.mock('../src/hooks/use-checkboxes', () => ({
  useCheckboxes: jest.fn(),
}));

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
  it('should render checkboxes for each day of the week', () => {
    const mockCurrentWeekDays = [
      new Date('2024-09-24'),
      new Date('2024-09-25'),
      new Date('2024-09-26'),
    ];

    (useCheckboxes as jest.Mock).mockReturnValue({
      currentWeekDays: mockCurrentWeekDays,
    });

    render(<Checkboxes habitId="habit-123" />);

    mockCurrentWeekDays.forEach(day => {
      expect(screen.getByTestId(`day-checkbox-${day.toISOString()}`)).toBeInTheDocument();
    });
  });
});
