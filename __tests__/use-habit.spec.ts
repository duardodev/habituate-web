import { renderHook, act } from '@testing-library/react';
import { useHabit } from '@/hooks/use-habit';
import { updateHabit } from '@/app/actions';

jest.mock('../src/app/actions', () => ({
  updateHabit: jest.fn(),
}));

describe('useHabit hook', () => {
  it('should initialize with isTitleEditing as false', () => {
    const { result } = renderHook(() => useHabit({ id: '1' }));
    expect(result.current.isTitleEditing).toBe(false);
  });

  it('should set isTitleEditing to true when startEditing is called', () => {
    const { result } = renderHook(() => useHabit({ id: '1' }));

    act(() => {
      result.current.startEditing();
    });

    expect(result.current.isTitleEditing).toBe(true);
  });

  it('should update habit title and set isTitleEditing to false when handleHabitTitleUpdate is called with not-empty title', () => {
    const { result } = renderHook(() => useHabit({ id: '1' }));

    act(() => {
      result.current.handleHabitTitleUpdate('New title');
    });

    expect(updateHabit).toHaveBeenCalledWith('1', 'New title');
    expect(result.current.isTitleEditing).toBe(false);
  });
});
