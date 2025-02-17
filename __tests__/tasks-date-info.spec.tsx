import { TasksDateInfo } from '@/app/(private)/management/components/tasks-date-info';
import { useDateStore } from '@/store/date-store';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

jest.mock('@/store/date-store', () => ({
  useDateStore: jest.fn(),
}));

describe('TasksDateInfo component', () => {
  const mockToday = dayjs('2025-01-05');

  beforeEach(() => {
    jest.clearAllMocks();

    (useDateStore as unknown as jest.Mock).mockReturnValue({
      today: mockToday,
    });
  });

  it('should render component with correct date information', () => {
    render(<TasksDateInfo />);
    expect(screen.getByText('January 5, 2025'));
  });
});
