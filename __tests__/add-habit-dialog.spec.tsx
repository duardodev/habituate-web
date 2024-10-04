import { fireEvent, render, screen } from '@testing-library/react';
import { AddHabitDialog } from '@/app/habits/components/add-habit-dialog';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

describe('AddHabitDialog component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dialog trigger button', () => {
    render(<AddHabitDialog />);
    expect(screen.getByRole('button', { name: 'Cadastrar hábito' })).toBeInTheDocument();
  });

  it('should open the dialog when the trigger button is clicked', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar hábito' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should disable the confirm button while submitting', async () => {
    const useFormStatusMock = jest.requireMock('react-dom').useFormStatus;
    useFormStatusMock.mockReturnValue({ pending: true });

    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar hábito' }));

    const confirmButton = screen.getByRole('button', { name: 'Confirmando' });
    expect(confirmButton).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should enable the confirm button after submission', async () => {
    const useFormStatusMock = jest.requireMock('react-dom').useFormStatus;
    useFormStatusMock.mockReturnValue({ pending: false });

    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar hábito' }));

    const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
    expect(confirmButton).not.toBeDisabled();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should close the dialog when cancel button is clicked', () => {
    render(<AddHabitDialog />);
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar hábito' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
