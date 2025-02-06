import { TaskPriority } from '@/app/management/components/task-priority';
import { useTaskContext } from '@/hooks/use-task-context';
import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/use-task-context');

describe('TaskPriority component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTaskContext as jest.Mock).mockReturnValue({
      priority: 'p1',
      completed: false,
    });
  });

  it('should render high priority correctly', () => {
    render(<TaskPriority />);

    const priorityElement = screen.getByText('High');
    expect(priorityElement).toBeInTheDocument();
    expect(priorityElement).toHaveClass('bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400');
  });

  it('should render medium priority correctly', () => {
    (useTaskContext as jest.Mock).mockReturnValue({
      priority: 'p2',
    });

    render(<TaskPriority />);

    const priorityElement = screen.getByText('Medium');
    expect(priorityElement).toBeInTheDocument();
    expect(priorityElement).toHaveClass('bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400');
  });

  it('should render low priority correctly', () => {
    (useTaskContext as jest.Mock).mockReturnValue({
      priority: 'p3',
    });

    render(<TaskPriority />);

    const priorityElement = screen.getByText('Low');
    expect(priorityElement).toBeInTheDocument();
    expect(priorityElement).toHaveClass('bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400');
  });

  it('should apply opacity when completed is true', () => {
    (useTaskContext as jest.Mock).mockReturnValue({
      priority: 'p1',
      completed: true,
    });

    render(<TaskPriority />);

    expect(screen.getByText('High')).toHaveClass('opacity-50');
  });
});
