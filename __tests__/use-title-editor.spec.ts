import { renderHook, act, waitFor } from '@testing-library/react';
import { useTitleEditor } from '@/hooks/use-title-editor';
import React from 'react';

describe('useTitleEditor hook', () => {
  it('should initialize with the provided title', () => {
    const { result } = renderHook(() => useTitleEditor({ title: 'Initial title', onTitleSave: jest.fn() }));
    expect(result.current.temporaryTitle).toBe('Initial title');
  });

  it('should update temporaryTitle when handleTitleChange is called', () => {
    const { result } = renderHook(() => useTitleEditor({ title: 'Initial title', onTitleSave: jest.fn() }));

    act(() => {
      result.current.handleTitleChange({
        target: { value: 'New title' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.temporaryTitle).toBe('New title');
  });

  it('should call onTitleSave with trimmed title when saveTitle is called with non-empty title', async () => {
    const onTitleSaveMock = jest.fn();
    const { result } = renderHook(() => useTitleEditor({ title: 'Initial title', onTitleSave: onTitleSaveMock }));

    act(() => {
      result.current.handleTitleChange({
        target: { value: '  New title  ' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.temporaryTitle).toBe('  New title  ');
    });

    act(() => {
      result.current.saveTitle();
    });

    expect(onTitleSaveMock).toHaveBeenCalledWith('New title');
  });

  it('should revert to original title if new title is empty or only whitespace', async () => {
    const onTitleSaveMock = jest.fn();
    const { result } = renderHook(() => useTitleEditor({ title: 'Initial title', onTitleSave: onTitleSaveMock }));

    act(() => {
      result.current.handleTitleChange({
        target: { value: '   ' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.temporaryTitle).toBe('   ');
    });

    act(() => {
      result.current.saveTitle();
    });

    expect(result.current.temporaryTitle).toBe('Initial title');
    expect(onTitleSaveMock).not.toHaveBeenCalled();
  });
});
