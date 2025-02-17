import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { TaskToggleButton } from '@/app/(private)/management/components/task-toggle-button';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskToggleButton } from '@/hooks/use-task-toggle-button';

jest.mock('@/hooks/use-task-context', () => ({
  useTaskContext: jest.fn(),
}));

jest.mock('@/hooks/use-task-toggle-button', () => ({
  useTaskToggleButton: jest.fn(),
}));

jest.mock('lucide-react', () => ({
  CheckCircle2: () => <div data-testid="check-circle" />,
  Circle: () => <div data-testid="circle" />,
}));

describe('TaskToggleButton component', () => {
  const mockHandleTaskToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTaskContext as jest.Mock).mockReturnValue({
      completed: false,
    });

    (useTaskToggleButton as jest.Mock).mockReturnValue({
      handleTaskToggle: mockHandleTaskToggle,
    });
  });

  it('should render uncompleted task button by default', () => {
    render(<TaskToggleButton />);
    expect(screen.getByTestId('circle')).toBeInTheDocument();
    expect(screen.queryByTestId('check-circle')).not.toBeInTheDocument();
  });

  it('should render completed task button when completed is true', () => {
    (useTaskContext as jest.Mock).mockReturnValue({
      completed: true,
    });

    render(<TaskToggleButton />);
    expect(screen.getByTestId('check-circle')).toBeInTheDocument();
    expect(screen.queryByTestId('circle')).not.toBeInTheDocument();
  });

  it('should call handleTaskToggle when button is clicked', async () => {
    render(<TaskToggleButton />);
    await userEvent.click(screen.getByRole('button'));
    expect(mockHandleTaskToggle).toHaveBeenCalledTimes(1);
  });
});
