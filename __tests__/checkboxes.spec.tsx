import { render, screen } from '@testing-library/react';
import { Checkboxes } from '@/app/(private)/management/components/checkboxes';
import { useCurrentWeekDays } from '@/hooks/use-current-week-days';

jest.mock('../src/hooks/use-current-week-days');

jest.mock('../src/app/(private)/management/components/day-checkbox', () => ({
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
  const mockCurrentWeekDays = [new Date('2024-12-05'), new Date('2024-12-04'), new Date('2024-12-03')];

  beforeEach(() => {
    (useCurrentWeekDays as jest.Mock).mockReturnValue({
      currentWeekDays: mockCurrentWeekDays,
    });
  });

  it('should render checkboxes for each day of the week', () => {
    render(<Checkboxes />);

    mockCurrentWeekDays.forEach(day => {
      expect(screen.getByTestId(`day-checkbox-${day.toISOString()}`)).toBeInTheDocument();
    });
  });
});
