import { render, screen } from '@testing-library/react';
import { WeekDays } from '@/app/management/components/week-days';
import { useCurrentWeekDays } from '@/hooks/use-current-week-days';
import dayjs from 'dayjs';

jest.mock('@/hooks/use-current-week-days', () => ({
  useCurrentWeekDays: jest.fn(),
}));

describe('WeekDays', () => {
  const mockDate = dayjs('2025-01-05');

  const createMockDayjs = (date: dayjs.Dayjs, isCurrentDay: boolean = false) => ({
    toString: () => date.toString(),
    format: (fmt: string) => date.format(fmt),
    day: () => date.day(),
    isToday: () => isCurrentDay,
    isSame: (d: dayjs.Dayjs) => date.isSame(d),
  });

  const mockWeekDays = [
    createMockDayjs(mockDate.startOf('week'), true),
    createMockDayjs(mockDate.startOf('week').add(1, 'day')),
    createMockDayjs(mockDate.startOf('week').add(2, 'day')),
    createMockDayjs(mockDate.startOf('week').add(3, 'day')),
    createMockDayjs(mockDate.startOf('week').add(4, 'day')),
    createMockDayjs(mockDate.startOf('week').add(5, 'day')),
    createMockDayjs(mockDate.startOf('week').add(6, 'day')),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useCurrentWeekDays as jest.Mock).mockReturnValue({
      currentWeekDays: mockWeekDays,
    });
  });

  it('should render all week days', () => {
    render(<WeekDays />);

    expect(screen.getByText('Dom')).toBeInTheDocument();
    expect(screen.getByText('Seg')).toBeInTheDocument();
    expect(screen.getByText('Ter')).toBeInTheDocument();
    expect(screen.getByText('Qua')).toBeInTheDocument();
    expect(screen.getByText('Qui')).toBeInTheDocument();
    expect(screen.getByText('Sex')).toBeInTheDocument();
    expect(screen.getByText('Sáb')).toBeInTheDocument();
  });

  it('should render correct dates for each day', () => {
    render(<WeekDays />);

    mockWeekDays.forEach(day => {
      const dateText = day.format('DD');
      expect(screen.getByText(dateText)).toBeInTheDocument();
    });
  });

  it('should show today indicator for current day', () => {
    render(<WeekDays />);

    const todayIndicator = screen.getByTestId('today-indicator');
    expect(todayIndicator).toBeInTheDocument();
  });

  it('should not show today indicator for other days', () => {
    const mockWeekDaysWithoutToday = mockWeekDays.map(day => ({
      ...day,
      isToday: () => false,
    }));

    (useCurrentWeekDays as jest.Mock).mockReturnValue({
      currentWeekDays: mockWeekDaysWithoutToday,
    });

    render(<WeekDays />);

    const todayIndicator = screen.queryByTestId('today-indicator');
    expect(todayIndicator).not.toBeInTheDocument();
  });
});
