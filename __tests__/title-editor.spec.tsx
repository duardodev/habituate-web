import { TitleEditor } from '@/app/(private)/management/components/title-editor';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../src/components/ui/input', () => ({
  Input: ({ ...props }) => <input data-testid="title-editor" {...props} />,
}));

describe('TitleEditor component', () => {
  it('should render initial title', () => {
    render(<TitleEditor title="Initial title" onTitleSave={jest.fn()} />);
    expect(screen.getByTestId('title-editor')).toHaveValue('Initial title');
  });

  it('should call onTitleSave when blurring with a new title', () => {
    const onTitleSaveMock = jest.fn();
    render(<TitleEditor title="Initial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('title-editor');

    fireEvent.change(input, { target: { value: 'New title' } });
    fireEvent.blur(input);

    expect(onTitleSaveMock).toHaveBeenCalledWith('New title');
  });

  it('should call onTitleSave when pressing Enter with a new title', () => {
    const onTitleSaveMock = jest.fn();
    render(<TitleEditor title="Intial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('title-editor');

    fireEvent.change(input, { target: { value: 'New title' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onTitleSaveMock).toHaveBeenCalledWith('New title');
  });

  it('should not call onTitleSave when pressing others keys', () => {
    const onTitleSaveMock = jest.fn();
    render(<TitleEditor title="Intial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('title-editor');

    fireEvent.change(input, { target: { value: 'New title' } });
    fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });

    expect(onTitleSaveMock).not.toHaveBeenCalled();
  });

  it('shoul not call onTitleSave when blurring with an empty title', () => {
    const onTitleSaveMock = jest.fn();
    render(<TitleEditor title="Initial title" onTitleSave={onTitleSaveMock} />);

    const input = screen.getByTestId('title-editor');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);

    expect(onTitleSaveMock).not.toHaveBeenCalled();
  });
});
