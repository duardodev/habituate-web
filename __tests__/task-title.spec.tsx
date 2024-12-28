import { TaskTitle } from '@/app/management/components/task-title';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskTitle } from '@/hooks/use-task-title';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/use-task-context', () => ({
  useTaskContext: jest.fn(),
}));

jest.mock('@/hooks/use-task-title', () => ({
  useTaskTitle: jest.fn(),
}));

describe('TaskTitle component', () => {
  const handleTaskTitleUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTaskContext as jest.Mock).mockReturnValue({
      title: 'Task 1',
      completed: false,
    });

    (useTaskTitle as jest.Mock).mockReturnValue({
      isTitleEditing: false,
      handleTaskTitleUpdate,
    });
  });

  it('should render title when not editing', () => {
    render(<TaskTitle />);
    expect(screen.getByRole('paragraph')).toHaveTextContent('Task 1');
  });

  it('should render TitleEditor when is editing', () => {
    (useTaskTitle as jest.Mock).mockReturnValue({
      isTitleEditing: true,
    });

    render(<TaskTitle />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
  });

  it('should handle title update', async () => {
    (useTaskTitle as jest.Mock).mockReturnValue({
      isTitleEditing: true,
      handleTaskTitleUpdate,
    });

    render(<TaskTitle />);

    const titleInput = screen.getByRole('textbox');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'New task');
    await userEvent.keyboard('{Enter}');

    expect(handleTaskTitleUpdate).toHaveBeenCalledWith('New task');
  });

  it('should have correct CSS classes for uncompleted task', () => {
    render(<TaskTitle />);
    expect(screen.getByRole('paragraph')).toHaveClass('text-zinc-900 dark:text-zinc-100');
  });

  it('should have correct CSS classes for completed task', () => {
    (useTaskContext as jest.Mock).mockReturnValue({
      completed: true,
    });

    render(<TaskTitle />);
    expect(screen.getByRole('paragraph')).toHaveClass('text-zinc-400 dark:text-zinc-500 line-through');
  });
});
