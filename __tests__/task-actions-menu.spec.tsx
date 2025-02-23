import { TaskActionsMenu } from '@/app/(private)/management/components/task-actions-menu';
import { useActiveTaskEditingContext } from '@/hooks/use-active-task-editing-context';
import { useTaskActionsMenu } from '@/hooks/use-task-actions-menu';
import { useTasksStore } from '@/store/tasks-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/use-task-context', () => ({
  useTaskContext: jest.fn(() => ({
    id: 'task-1',
  })),
}));

jest.mock('@/hooks/use-active-task-editing-context');
jest.mock('@/hooks/use-task-actions-menu');
jest.mock('@/store/tasks-store');

describe('TaskActionsMenu component', () => {
  const mockHandleToggleTaskEditing = jest.fn();
  const mockRemoveTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useActiveTaskEditingContext as jest.Mock).mockReturnValue({
      handleToggleTaskEditing: mockHandleToggleTaskEditing,
    });

    (useTaskActionsMenu as jest.Mock).mockReturnValue({
      isTitleEditing: false,
    });

    (useTasksStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        removeTask: mockRemoveTask,
      };

      return selector(state);
    });
  });

  it('should render a button to disable editing when isTitleEditing is true', () => {
    (useTaskActionsMenu as jest.Mock).mockReturnValue({
      isTitleEditing: true,
    });

    render(<TaskActionsMenu />);
    expect(screen.queryByRole('button', { name: 'Disable editing' })).toBeInTheDocument();
  });

  it('should render UserActionsMenu when click trigger button is clicked', async () => {
    render(<TaskActionsMenu />);
    await userEvent.click(screen.getByRole('button', { name: 'Open the task actions menu' }));
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('should call toggleEditingTask when is rename option is clicked', async () => {
    render(<TaskActionsMenu />);
    await userEvent.click(screen.getByRole('button', { name: 'Open the task actions menu' }));
    await userEvent.click(screen.getByText('Rename'));
    expect(mockHandleToggleTaskEditing).toHaveBeenCalledWith('task-1');
  });

  it('should call removeTask when is remove option is clicked', async () => {
    render(<TaskActionsMenu />);
    await userEvent.click(screen.getByRole('button', { name: 'Open the task actions menu' }));
    await userEvent.click(screen.getByText('Remove'));
    expect(mockRemoveTask).toHaveBeenCalledWith('task-1');
  });
});
