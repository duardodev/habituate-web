import { deleteHabit, updateHabitTitle } from '@/app/actions/habit-actions';
import { useHabitTitle } from '@/hooks/use-habit-title';
import { useQueryClient } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

jest.mock('@/app/actions/habit-actions', () => ({
  deleteHabit: jest.fn(),
  updateHabitTitle: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

jest.mock('@/hooks/use-habit-context', () => ({
  useHabitContext: jest.fn(() => ({
    id: 'habit-1',
    title: 'Old title',
  })),
}));

describe('useHabitTitle hook', () => {
  let queryClient: { invalidateQueries: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = { invalidateQueries: jest.fn() };
    (useQueryClient as jest.Mock).mockReturnValue(queryClient);
  });

  it('should initializate with isTitleEditing as false', () => {
    const { result } = renderHook(() => useHabitTitle());
    expect(result.current.isTitleEditing).toBe(false);
  });

  it('should set isTitleEditing to true when startEditing is called', () => {
    const { result } = renderHook(() => useHabitTitle());

    act(() => {
      result.current.startEditing();
    });

    expect(result.current.isTitleEditing).toBe(true);
  });
  ('');

  it('should call updateHabitTitle and set isTitleEditing to false when handleHabitTitleUpdate is called', () => {
    (updateHabitTitle as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useHabitTitle());

    act(() => {
      result.current.handleHabitTitleUpdate('New title');
    });

    expect(updateHabitTitle).toHaveBeenCalledWith('habit-1', 'New title');
    expect(result.current.isTitleEditing).toBe(false);
  });

  it('should not call updateHabitTitle if new title is the same as the current title', async () => {
    const { result } = renderHook(() => useHabitTitle());

    act(() => {
      result.current.handleHabitTitleUpdate('Old title');
    });

    expect(updateHabitTitle).not.toHaveBeenCalled();
  });

  it('should call deleteHabit and invalidate queries when handleRemoveHabit is called', async () => {
    (deleteHabit as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useHabitTitle());

    await act(async () => {
      await result.current.handleRemoveHabit();
    });

    expect(deleteHabit).toHaveBeenCalledWith('habit-1');
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['get-habits'] });
  });
});
