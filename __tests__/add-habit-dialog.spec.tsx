import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddHabitDialog } from '@/app/management/components/add-habit-dialog';
import { useAddHabitDialog } from '@/hooks/use-add-habit-dialog';
import { useHabitsQuery } from '@/hooks/use-habits-query';

jest.mock('@/hooks/use-add-habit-dialog', () => ({
  useAddHabitDialog: jest.fn(),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

jest.mock('@/hooks/use-habits-query', () => ({
  useHabitsQuery: jest.fn(),
}));

describe('AddHabitDialog component', () => {
  const mockHandleAddHabit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAddHabitDialog as jest.Mock).mockReturnValue({
      handleAddHabit: mockHandleAddHabit,
    });

    (useHabitsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
    });
  });

  it('should render the dialog trigger button', () => {
    render(<AddHabitDialog />);
    expect(screen.getByRole('button', { name: 'Add new habit' })).toBeInTheDocument();
  });

  it('should disable the dialog trigger button when isLoading or isError is true', () => {
    (useHabitsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    render(<AddHabitDialog />);
    expect(screen.getByRole('button', { name: 'Add new habit' })).toBeDisabled();

    (useHabitsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
    });

    expect(screen.getByRole('button', { name: 'Add new habit' })).toBeDisabled();
  });

  it('should open the dialog when the trigger button is clicked', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Add new habit' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render and allow input for habit title', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Add new habit' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Meditate, exercise, read a book...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'New habit' } });
    expect(input).toHaveValue('New habit');
  });

  it('should close the dialog when cancel button is clicked', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Add new habit' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
