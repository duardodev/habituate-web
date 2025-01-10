import { RemoveTasksButton } from '@/app/management/components/remove-tasks-button';
import { useTasksStore } from '@/store/tasks-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/store/tasks-store');

describe('RemoveTasksButton component', () => {
  const mockRemoveAllTasks = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        removeAllTasks: mockRemoveAllTasks,
        amountTasks: () => 5,
      };

      return selector(state);
    });
  });

  it('should render the button', () => {
    render(<RemoveTasksButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call removeAllTasks when button is clicked', async () => {
    render(<RemoveTasksButton />);
    await userEvent.click(screen.getByRole('button'));
    expect(mockRemoveAllTasks).toHaveBeenCalledTimes(1);
  });

  it('should disable the button when amountTasks is zero', () => {
    (useTasksStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        removeAllTasks: mockRemoveAllTasks,
        amountTasks: () => 0,
      };

      return selector(state);
    });

    render(<RemoveTasksButton />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
