import { HabitsMetric } from '@/app/(private)/management/components/habits-metric';
import { useHabitsMetric } from '@/hooks/use-habits-metric';
import { useHabitsQuery } from '@/hooks/use-habits-query';
import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/use-habits-metric', () => ({
  useHabitsMetric: jest.fn(),
}));

jest.mock('@/hooks/use-habits-query', () => ({
  useHabitsQuery: jest.fn(),
}));

describe('HabitsMetric component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useHabitsMetric as jest.Mock).mockReturnValue({
      completedHabitsCount: 10,
      percentage: 50,
    });

    (useHabitsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
    });
  });

  it('should render metric with correct values when data is loaded successfully', () => {
    render(<HabitsMetric />);
    expect(screen.getByText('Habits')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should display loading skeleton while fetching data', () => {
    (useHabitsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<HabitsMetric />);
    expect(screen.getByText('Habits')).toBeInTheDocument();
    expect(screen.queryByText('10')).not.toBeInTheDocument();
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('should show zero values when an error occurs', () => {
    (useHabitsQuery as jest.Mock).mockReturnValue({
      isError: true,
    });

    render(<HabitsMetric />);
    expect(screen.getByText('Habits')).toBeInTheDocument();
    expect(screen.queryByText('0')).toBeInTheDocument();
    expect(screen.queryByText('0%')).toBeInTheDocument();
  });
});
