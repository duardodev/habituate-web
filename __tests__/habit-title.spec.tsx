import { HabitTitle } from '@/app/(private)/management/components/habit-title';
import { useHabitContext } from '@/hooks/use-habit-context';
import { useHabitTitle } from '@/hooks/use-habit-title';
import { useTitleWidth } from '@/hooks/use-title-width';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/use-habit-title', () => ({
  useHabitTitle: jest.fn(),
}));

jest.mock('@/hooks/use-title-width', () => ({
  useTitleWidth: jest.fn(),
}));

jest.mock('@/hooks/use-habit-context', () => ({
  useHabitContext: jest.fn(),
}));

describe('HabitTitle component', () => {
  const startEditing = jest.fn();
  const handleHabitTitleUpdate = jest.fn();
  const handleRemoveHabit = jest.fn();

  const mockOffsetWidth = 150;
  const mockRef = { current: { offsetWidth: mockOffsetWidth } };

  beforeEach(() => {
    jest.clearAllMocks();

    (useHabitTitle as jest.Mock).mockReturnValue({
      isTitleEditing: false,
      handleHabitTitleUpdate,
      handleRemoveHabit,
      startEditing,
    });

    (useHabitContext as jest.Mock).mockReturnValue({
      title: 'Test habit',
    });

    (useTitleWidth as jest.Mock).mockReturnValue({
      titleRef: mockRef,
      titleWidth: mockOffsetWidth + 18,
    });
  });

  describe('when not editing', () => {
    it('should render the title correctly', () => {
      render(<HabitTitle />);
      expect(screen.getByText('Test habit')).toBeInTheDocument();
    });

    it('should open UserActionsMenu and handle rename/remove actions', async () => {
      render(<HabitTitle />);

      await userEvent.click(screen.getByText('Test habit'));

      const renameOption = screen.getByText('Rename');
      expect(renameOption).toBeInTheDocument();
      await userEvent.click(renameOption);
      expect(startEditing).toHaveBeenCalledTimes(1);

      await userEvent.click(screen.getByText('Test habit'));

      const removeOption = screen.getByText('Remove');
      expect(removeOption).toBeInTheDocument();
      await userEvent.click(removeOption);
      expect(handleRemoveHabit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when editing', () => {
    it('should render TitleEditor with the correct initial title', () => {
      (useHabitTitle as jest.Mock).mockReturnValue({
        isTitleEditing: true,
      });

      render(<HabitTitle />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test habit')).toBeInTheDocument();
    });

    it('should calculate and apply the correct title width', () => {
      (useHabitTitle as jest.Mock).mockReturnValue({
        isTitleEditing: true,
      });

      render(<HabitTitle />);

      const titleInput = screen.getByRole('textbox');
      expect(titleInput).toHaveAttribute('style', `width: ${mockOffsetWidth + 18}px;`);
    });

    it('should update the title when Enter is pressed', async () => {
      (useHabitTitle as jest.Mock).mockReturnValue({
        isTitleEditing: true,
        handleHabitTitleUpdate,
      });

      render(<HabitTitle />);

      const titleInput = screen.getByRole('textbox');
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'New habit title');
      await userEvent.keyboard('{Enter}');

      expect(handleHabitTitleUpdate).toHaveBeenCalledWith('New habit title');
    });
  });
});
