import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { DayCheckbox } from '@/app/habits/components/day-checkbox';
import { useDayCheckbox } from '@/hooks/use-day-checkbox';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

jest.mock('../src/hooks/use-day-checkbox', () => ({
  useDayCheckbox: jest.fn(),
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
  });

  it('should render correctly', () => {
    const { getByRole } = render(<DayCheckbox currentWeekDay={dayjs().utcOffset(-3)} />);
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  it('should call the handleHabitToggle function when clicked', async () => {
    const currentWeekDay = dayjs();
    const { getByRole } = render(<DayCheckbox currentWeekDay={currentWeekDay} />);

    const checkbox = getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(mockHandleHabitToggle).toHaveBeenCalledWith(currentWeekDay.utcOffset(-3).startOf('day').toISOString());
  });
});
