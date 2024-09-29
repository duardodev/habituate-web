import { Habit } from '@/app/habits/components/habit';
import { useHabit } from '@/hooks/use-habit';
import { render, screen } from '@testing-library/react';

jest.mock('../src/hooks/use-habit', () => ({
  useHabit: jest.fn(),
}));

jest.mock('../src/app/habits/components/checkboxes', () => ({
  Checkboxes: () => <div data-testid="checkboxes">Checkboxes</div>,
}));

jest.mock('../src/app/habits/components/habit-title-input', () => ({
  HabitTitleInput: ({ title, onTitleSave }: any) => (
    <input
      data-testid="habit-title-input"
      value={title}
      onChange={e => onTitleSave(e.target.value)}
    />
  ),
}));

jest.mock('../src/app/habits/components/user-actions-menu', () => ({
  UserActionsMenu: () => <div data-testid="user-actions-menu">User Actions Menu</div>,
}));

describe('Habit component', () => {
  beforeEach(() => {
    (useHabit as jest.Mock).mockReturnValue({
      isTitleEditing: false,
      handleHabitTitleUpdate: jest.fn(),
      startEditing: jest.fn(),
    });
  });

  it('should render HabitTitleInput when is isTitleEditing is true', () => {
    (useHabit as jest.Mock).mockReturnValue({
      isTitleEditing: true,
      handleHabitTitleUpdate: jest.fn(),
      startEditing: jest.fn(),
    });

    render(<Habit id="1" title="Test habit" />);
    expect(screen.getByTestId('habit-title-input')).toBeInTheDocument();
  });

  it('should render habit title when is isTitleEditing is false', () => {
    (useHabit as jest.Mock).mockReturnValue({
      isTitleEditing: false,
      handleHabitTitleUpdate: jest.fn(),
      startEditing: jest.fn(),
    });

    render(<Habit id="1" title="Test habit" />);
    expect(screen.getByText('Test habit')).toBeInTheDocument();
  });

  it('should render Checkboxes component', () => {
    render(<Habit id="1" title="Test habit" />);
    expect(screen.getByTestId('checkboxes')).toBeInTheDocument();
  });

  it('should render UserActionsMenu component', () => {
    render(<Habit id="1" title="Test habit" />);
    expect(screen.getByTestId('user-actions-menu')).toBeInTheDocument();
  });
});
