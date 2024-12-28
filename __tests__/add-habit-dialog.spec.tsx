import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddHabitDialog } from '@/app/management/components/add-habit-dialog';
import { useAddHabitDialog } from '@/hooks/use-add-habit-dialog';

jest.mock('@/hooks/use-add-habit-dialog', () => ({
  useAddHabitDialog: jest.fn(),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

describe('AddHabitDialog component', () => {
  const mockHandleAddHabit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAddHabitDialog as jest.Mock).mockReturnValue({
      handleAddHabit: mockHandleAddHabit,
    });
  });

  it('should render the dialog trigger button', () => {
    render(<AddHabitDialog />);
    expect(screen.getByRole('button', { name: 'Adicionar hábito' })).toBeInTheDocument();
  });

  it('should open the dialog when the trigger button is clicked', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar hábito' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render and allow input for habit title', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar hábito' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Meditar, exercitar-se, estudar inglês...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Novo hábito' } });
    expect(input).toHaveValue('Novo hábito');
  });

  it('should close the dialog when cancel button is clicked', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar hábito' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
