import { TaskTitle } from '@/app/(private)/management/components/task-title';
import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskTitle } from '@/hooks/use-task-title';
import { useTitleWidth } from '@/hooks/use-title-width';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/use-task-context', () => ({
  useTaskContext: jest.fn(),
}));

jest.mock('@/hooks/use-title-width', () => ({
  useTitleWidth: jest.fn(),
}));

jest.mock('@/hooks/use-task-title', () => ({
  useTaskTitle: jest.fn(),
}));

describe('TaskTitle component', () => {
  const handleTaskTitleUpdate = jest.fn();
  const mockOffsetWidth = 80;

  beforeEach(() => {
    jest.clearAllMocks();

    (useTaskContext as jest.Mock).mockReturnValue({
      title: 'Task 1',
      completed: false,
    });

    (useTitleWidth as jest.Mock).mockReturnValue({
      titleWidth: mockOffsetWidth + 18,
      titleRef: { current: { offsetWidth: mockOffsetWidth } },
    });

    (useTaskTitle as jest.Mock).mockReturnValue({
      isTitleEditing: false,
      handleTaskTitleUpdate,
    });
  });

  describe('when not editing', () => {
    it('should render the title correctly', () => {
      render(<TaskTitle />);
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    it('should have correct CSS classes for uncompleted task', () => {
      render(<TaskTitle />);
      expect(screen.getByText('Task 1')).toHaveClass('text-zinc-900 dark:text-zinc-100');
    });

    it('should have correct CSS classes for completed task', () => {
      (useTaskContext as jest.Mock).mockReturnValue({
        title: 'Task 1',
        completed: true,
      });

      render(<TaskTitle />);
      expect(screen.getByText('Task 1')).toHaveClass('text-zinc-400 dark:text-zinc-500 line-through');
    });
  });

  describe('when editing', () => {
    it('should render TitleEditor with the correct initial title', () => {
      (useTaskTitle as jest.Mock).mockReturnValue({
        isTitleEditing: true,
      });

      render(<TaskTitle />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    });

    it('should calculate and apply the correct title width', () => {
      (useTaskTitle as jest.Mock).mockReturnValue({
        isTitleEditing: true,
      });

      render(<TaskTitle />);
      expect(screen.getByRole('textbox')).toHaveAttribute('style', `width: ${mockOffsetWidth + 18}px;`);
    });

    it('should call handleTaskTitleUpdate when Enter is pressed', async () => {
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
  });
});
