import { TasksMetric } from '@/app/habits/components/tasks-metric';
import { useLoading } from '@/hooks/use-loading';
import { useTasksMetric } from '@/hooks/use-tasks-metric';
import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/use-tasks-metric', () => ({
  useTasksMetric: jest.fn(),
}));

jest.mock('@/hooks/use-loading', () => ({
  useLoading: jest.fn(),
}));

describe('TasksMetric component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksMetric as jest.Mock).mockReturnValue({
      completedTasksCount: 5,
      percentage: 50,
    });

    (useLoading as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  it('should render metric with correct values', () => {
    render(<TasksMetric />);
    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should display loading skeleton while fetching data', () => {
    (useLoading as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<TasksMetric />);
    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });
});
