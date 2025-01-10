import { TaskActionsMenu } from '@/app/management/components/task-actions-menu';
import { useTaskTitle } from '@/hooks/use-task-title';
import { useTaskTitleStore } from '@/store/task-title-store';
import { useTasksStore } from '@/store/tasks-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/use-task-context', () => ({
  useTaskContext: jest.fn(() => ({
    id: 'task-1',
  })),
}));

jest.mock('@/store/task-title-store');
jest.mock('@/store/tasks-store');
jest.mock('@/hooks/use-task-title');

describe('TaskActionsMenu component', () => {
  const mockToggleEditingTask = jest.fn();
  const mockRemoveTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTaskTitleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        toggleEditingTask: mockToggleEditingTask,
      };

      return selector(state);
    });

    (useTasksStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        removeTask: mockRemoveTask,
      };

      return selector(state);
    });

    (useTaskTitle as jest.Mock).mockReturnValue({
      isTitleEditing: false,
    });
  });

  it('should not render DropdownMenu when isTitleEditing is true', () => {
    (useTaskTitle as jest.Mock).mockReturnValue({
      isTitleEditing: true,
    });

    render(<TaskActionsMenu />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render UserActionsMenu when click trigger button is clicked', async () => {
    render(<TaskActionsMenu />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Renomear')).toBeInTheDocument();
    expect(screen.getByText('Remover')).toBeInTheDocument();
  });

  it('should call toggleEditingTask when is rename option is clicked', async () => {
    render(<TaskActionsMenu />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByText('Renomear'));
    expect(mockToggleEditingTask).toHaveBeenCalledWith('task-1');
  });

  it('should call removeTask when is remove option is clicked', async () => {
    render(<TaskActionsMenu />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByText('Remover'));
    expect(mockRemoveTask).toHaveBeenCalledWith('task-1');
  });
});
