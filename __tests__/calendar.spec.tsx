import { render, screen } from '@testing-library/react';
import { Calendar } from '@/app/(private)/management/components/calendar';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

describe('Calendar Component', () => {
  const currentDate = dayjs();

  it('should navigate to the previous week', async () => {
    render(<Calendar />);

    const previousWeek = currentDate.startOf('week').subtract(1, 'week');
    const previousWeekDays = Array.from({ length: 7 }, (_, i) => previousWeek.add(i, 'day'));

    await userEvent.click(screen.getByRole('button', { name: /Go to previous week/i }));

    previousWeekDays.forEach(previousWeekDay => {
      expect(screen.getByText(previousWeekDay.format('DD'))).toBeInTheDocument();
    });
  });

  it('should navigate to the next week', async () => {
    render(<Calendar />);

    const previousWeek = currentDate.startOf('week').subtract(1, 'week');
    const nextWeek = previousWeek.add(1, 'week');
    const nextWeekDays = Array.from({ length: 7 }, (_, i) => nextWeek.add(i, 'day'));

    await userEvent.click(screen.getByRole('button', { name: /Go to next week/i }));

    nextWeekDays.forEach(nextWeekDay => {
      expect(screen.getByText(nextWeekDay.format('DD'))).toBeInTheDocument();
    });
  });
});
