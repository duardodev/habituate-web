import { render, screen } from '@testing-library/react';
import { TaskList } from '@/app/(private)/management/components/task-list';
import { useLoading } from '@/hooks/use-loading';
import { useTasksStore } from '@/store/tasks-store';
import { ReactNode } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
}

jest.mock('@/hooks/use-loading', () => ({
  useLoading: jest.fn(),
}));

jest.mock('@/store/tasks-store', () => ({
  useTasksStore: jest.fn(),
}));

jest.mock('@/app/(private)/management/components/task-skeleton', () => ({
  TaskSkeleton: () => <div data-testid="task-skeleton" />,
}));

jest.mock('@/app/(private)/management/components/task', () => ({
  Task: () => <div data-testid="task-component" />,
}));

jest.mock('@/contexts/task-context', () => ({
  TaskProvider: ({ children, task }: { children: ReactNode; task: Task }) => (
    <div data-testid="task-provider" data-task={JSON.stringify(task)}>
      {children}
    </div>
  ),
}));

describe('TasksList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksStore as unknown as jest.Mock).mockReturnValue([]);

    (useLoading as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  it('should render loading skeleton when isLoading is true', () => {
    (useLoading as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<TaskList />);

    expect(screen.getByTestId('task-skeleton')).toBeInTheDocument();
  });

  it('should render message when there are no tasks', () => {
    render(<TaskList />);
    expect(screen.getByText(/No tasks for today/i)).toBeInTheDocument();
  });

  it('should render when there are tasks', () => {
    (useTasksStore as unknown as jest.Mock).mockReturnValue([
      {
        id: 'task-1',
        title: 'Task 1',
        completed: true,
        priority: 'p1',
      },
      {
        id: 'task-2',
        title: 'Task 2',
        completed: false,
        priority: 'p2',
      },
    ]);

    render(<TaskList />);
    expect(screen.getAllByTestId('task-component')).toHaveLength(2);
  });

  it('should pass correct props to TaskProvider', () => {
    (useTasksStore as unknown as jest.Mock).mockReturnValue([
      {
        id: 'task-1',
        title: 'Task 1',
        completed: false,
        priority: 'p1',
      },
    ]);

    render(<TaskList />);

    expect(screen.getByTestId('task-provider')).toHaveAttribute(
      'data-task',
      JSON.stringify({
        id: 'task-1',
        title: 'Task 1',
        completed: false,
        priority: 'p1',
      })
    );
  });
});
