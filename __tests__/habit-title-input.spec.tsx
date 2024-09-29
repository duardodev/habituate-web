import { HabitTitleInput } from '@/app/habits/components/habit-title-input';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../src/components/ui/input', () => ({
  Input: ({ ...props }) => <input data-testid="habit-input" {...props} />,
}));

describe('HabitTitleInput component', () => {
  it('should render initial title', () => {
    render(<HabitTitleInput title="Initial title" onTitleSave={jest.fn()} />);
    expect(screen.getByTestId('habit-input')).toHaveValue('Initial title');
  });

  it('should call onTitleSave when blurring with a new title', () => {
    const onTitleSaveMock = jest.fn();
    render(<HabitTitleInput title="Initial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('habit-input');

    fireEvent.change(input, { target: { value: 'New title' } });
    fireEvent.blur(input);

    expect(onTitleSaveMock).toHaveBeenCalledWith('New title');
  });

  it('should call onTitleSave when pressing Enter with a new title', () => {
    const onTitleSaveMock = jest.fn();
    render(<HabitTitleInput title="Intial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('habit-input');

    fireEvent.change(input, { target: { value: 'New title' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onTitleSaveMock).toHaveBeenCalledWith('New title');
  });

  it('should not call onTitleSave when pressing others keys', () => {
    const onTitleSaveMock = jest.fn();
    render(<HabitTitleInput title="Intial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('habit-input');

    fireEvent.change(input, { target: { value: 'New title' } });
    fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });

    expect(onTitleSaveMock).not.toHaveBeenCalled();
  });

  it('shoul not call onTitleSave when blurring with an empty title', () => {
    const onTitleSaveMock = jest.fn();
    render(<HabitTitleInput title="Initial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('habit-input');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);

    expect(onTitleSaveMock).not.toHaveBeenCalled();
  });
});
