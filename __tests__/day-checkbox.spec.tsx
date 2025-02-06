import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import { DayCheckbox } from '@/app/management/components/day-checkbox';
import { useDayCheckbox } from '@/hooks/use-day-checkbox';
import { useHabitContext } from '@/hooks/use-habit-context';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { monthsNames } from '@/lib/data';
dayjs.extend(utc);

jest.mock('../src/hooks/use-day-checkbox', () => ({
  useDayCheckbox: jest.fn(),
}));

jest.mock('../src/hooks/use-habit-context', () => ({
  useHabitContext: jest.fn(),
}));

describe('DayCheckbox component', () => {
  const mockHandleHabitToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useDayCheckbox as jest.Mock).mockReturnValue({
      handleHabitToggle: mockHandleHabitToggle,
      isChecked: false,
      isDisabled: false,
    });

    (useHabitContext as jest.Mock).mockReturnValue({
      title: 'Test Habit',
    });
  });

  it('should render correctly', () => {
    const { getByRole } = render(<DayCheckbox currentWeekDay={dayjs().utcOffset(-3)} />);
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  it('should have the correct aria-label', () => {
    const currentWeekDay = dayjs().utcOffset(-3);
    const { getByRole } = render(<DayCheckbox currentWeekDay={currentWeekDay} />);

    const checkbox = getByRole('checkbox');
    const expectedLabel = `Habit "Test Habit" marked as incomplete on ${
      monthsNames[currentWeekDay.month()]
    } ${currentWeekDay.date()}, ${currentWeekDay.year()}`;

    expect(checkbox).toHaveAttribute('aria-label', expectedLabel);
  });

  it('should call the handleHabitToggle function when clicked', async () => {
    const currentWeekDay = dayjs();
    const { getByRole } = render(<DayCheckbox currentWeekDay={currentWeekDay} />);

    const checkbox = getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(mockHandleHabitToggle).toHaveBeenCalledWith(currentWeekDay.utcOffset(-3).startOf('day').toISOString());
  });

  it('should call the handleHabitToggle function when enter is pressed', async () => {
    const currentWeekDay = dayjs();
    const { getByRole } = render(<DayCheckbox currentWeekDay={currentWeekDay} />);

    const checkbox = getByRole('checkbox');
    fireEvent.focus(checkbox);
    await userEvent.keyboard('{Enter}');
  });
});
