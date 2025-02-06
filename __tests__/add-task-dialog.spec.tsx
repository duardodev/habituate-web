import { AddTaskDialog } from '@/app/management/components/add-task-dialog';
import { useAddTaskDialog } from '@/hooks/use-add-task-dialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockFormData = {
  get: jest.fn(),
};

(global as any).FormData = jest.fn(() => mockFormData);

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

jest.mock('@/hooks/use-add-task-dialog', () => ({
  useAddTaskDialog: jest.fn(),
}));

describe('AddTaskDialog component', () => {
  const mockHandleSubmit = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAddTaskDialog as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
    });
  });

  it('should render the dialog trigger button', () => {
    render(<AddTaskDialog />);
    expect(screen.getByRole('button', { name: 'Add new task' })).toBeInTheDocument();
  });

  it('should open the dialog when trigger button is clicked', async () => {
    render(<AddTaskDialog />);
    await user.click(screen.getByRole('button', { name: 'Add new task' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close the dialog when cancel button is clicked', async () => {
    render(<AddTaskDialog />);
    await user.click(screen.getByRole('button', { name: 'Add new task' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render the form with correct input fields', async () => {
    render(<AddTaskDialog />);
    await user.click(screen.getByRole('button', { name: 'Add new task' }));

    expect(screen.getByPlaceholderText('Pay electricity bill, etc...')).toBeInTheDocument();
    expect(screen.getByLabelText('Select priority')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('should call handleSubmit when form is submitted', async () => {
    render(<AddTaskDialog />);
    await user.click(screen.getByRole('button', { name: 'Add new task' }));

    const titleInput = screen.getByPlaceholderText('Pay electricity bill, etc...');
    await user.type(titleInput, 'New task');

    const submitButton = screen.getByRole('button', { name: 'Confirm' });
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith(expect.any(Object));
  });
});
