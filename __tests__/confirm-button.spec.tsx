import { render, screen } from '@testing-library/react';
import { ConfirmButton } from '@/app/habits/components/confirm-button';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

describe('ConfirmButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render "Confirmar" when not pending', () => {
    render(<ConfirmButton />);

    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    expect(screen.queryByText('Confirmando')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should render "Confirmando" with loader when pending', () => {
    const useFormStatusMock = jest.requireMock('react-dom').useFormStatus;
    useFormStatusMock.mockReturnValue({ pending: true });

    render(<ConfirmButton />);

    expect(screen.getByRole('button', { name: 'Confirmando' })).toBeInTheDocument();
    expect(screen.queryByText('Confirmar')).not.toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should disable the button when pending', () => {
    const useFormStatusMock = jest.requireMock('react-dom').useFormStatus;
    useFormStatusMock.mockReturnValue({ pending: true });

    render(<ConfirmButton />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should enable the button when not pending', () => {
    const useFormStatusMock = jest.requireMock('react-dom').useFormStatus;
    useFormStatusMock.mockReturnValue({ pending: false });

    render(<ConfirmButton />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});