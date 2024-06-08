import { fireEvent, render, screen } from '@testing-library/react';
import { Calendar, monthsNames } from '@/components/calendar';
import dayjs from 'dayjs';
import '@testing-library/jest-dom';

describe('Calendar Component', () => {
  it('should render the current month and year', () => {
    render(<Calendar />);

    const currentDate = dayjs();
    const currentMonth = monthsNames[currentDate.month()];
    const currentYear = currentDate.format('YYYY');

    expect(screen.getByText(new RegExp(`${currentMonth}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${currentYear}`, 'i'))).toBeInTheDocument();
  });

  it('should render days of the current week', () => {
    render(<Calendar />);

    const currentDate = dayjs();
    const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.add(i, 'day'));

    currentWeekDays.forEach(currentWeekDay => {
      expect(screen.getByText(currentWeekDay.format('DD'))).toBeInTheDocument();
    });
  });

  it('should navigate to the previous week', () => {
    render(<Calendar />);

    const currentDate = dayjs();
    const previousWeek = currentDate.subtract(1, 'week');
    const previousWeekDays = Array.from({ length: 7 }, (_, i) => previousWeek.add(i, 'day'));

    fireEvent.click(screen.getByRole('button', { name: /go to previous week/i }));

    previousWeekDays.forEach(previousWeekDay => {
      expect(screen.getByText(previousWeekDay.format('DD'))).toBeInTheDocument();
    });
  });

  it('should navigate to the next week', () => {
    render(<Calendar />);

    const currentDate = dayjs().subtract(1, 'week');
    const nextWeek = currentDate.add(1, 'week');
    const nextWeekDays = Array.from({ length: 7 }, (_, i) => nextWeek.add(i, 'day'));

    fireEvent.click(screen.getByRole('button', { name: /go to next week/i }));

    nextWeekDays.forEach(nextWeekDay => {
      expect(screen.getByText(nextWeekDay.format('DD'))).toBeInTheDocument();
    });
  });
});
