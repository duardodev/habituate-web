import { HabitTitle } from '@/app/habits/components/habit-title';
import { TitleEditor } from '@/app/habits/components/title-editor';
import { useHabitTitle } from '@/hooks/use-habit-title';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/use-habit-title', () => ({
  useHabitTitle: jest.fn(),
}));

jest.mock('@/hooks/use-habit-context', () => ({
  useHabitContext: jest.fn(() => ({
    title: 'Test habit',
  })),
}));

describe('HabitTitle component', () => {
  const startEditing = jest.fn();
  const handleHabitTitleUpdate = jest.fn();
  const handleRemoveHabit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useHabitTitle as jest.Mock).mockReturnValue({
      isTitleEditing: false,
      handleHabitTitleUpdate,
      handleRemoveHabit,
      startEditing,
    });
  });

  it('should render TitleEditor when is editing', () => {
    (useHabitTitle as jest.Mock).mockReturnValue({
      isTitleEditing: true,
      handleHabitTitleUpdate,
    });

    render(<HabitTitle />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test habit')).toBeInTheDocument();
  });

  it('should render title when not editing', () => {
    render(<HabitTitle />);
    expect(screen.getByText('Test habit')).toBeInTheDocument();
  });

  it('should open UserActionsMenu when title is clicked and handle menu actions', async () => {
    render(<HabitTitle />);

    await userEvent.click(screen.getByText('Test habit'));

    const renameOption = screen.getByText('Renomear');
    expect(renameOption).toBeInTheDocument();
    await userEvent.click(renameOption);
    expect(startEditing).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByText('Test habit'));

    const removeOption = screen.getByText('Remover');
    expect(removeOption).toBeInTheDocument();
    await userEvent.click(removeOption);
    expect(handleRemoveHabit).toHaveBeenCalledTimes(1);
  });

  it('should handle title udpate', async () => {
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
