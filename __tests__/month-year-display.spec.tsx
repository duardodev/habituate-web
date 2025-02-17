import { MonthYearDisplay } from '@/app/(private)/management/components/month-year-display';
import { monthsNames } from '@/lib/data';
import { useDateStore } from '@/store/date-store';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

jest.mock('@/store/date-store', () => ({
  useDateStore: jest.fn(),
}));

describe('MonthYearDisplay component', () => {
  const mockCurrentDate = dayjs();

  beforeEach(() => {
    jest.clearAllMocks();

    (useDateStore as unknown as jest.Mock).mockReturnValue({
      currentDate: mockCurrentDate,
    });
  });

  it('should render the current month and year', () => {
    render(<MonthYearDisplay />);
    const currentMonth = monthsNames[mockCurrentDate.month()].slice(0, 3);
    const currentYear = mockCurrentDate.year();

    expect(screen.getByText(new RegExp(`${currentMonth}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${currentYear}`, 'i'))).toBeInTheDocument();
  });
});
