import { useTaskToggleButton } from '@/hooks/use-task-toggle-button';
import { useTasksStore } from '@/store/tasks-store';
import { act, renderHook } from '@testing-library/react';

jest.mock('@/hooks/use-task-context', () => ({
  useTaskContext: jest.fn(() => ({
    id: 'task-1',
  })),
}));

jest.mock('@/store/tasks-store', () => ({
  useTasksStore: jest.fn(),
}));

describe('useTaskToggleButton hook', () => {
  const mockToggleTask = jest.fn();
  const mockPreventDefault = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksStore as unknown as jest.Mock).mockReturnValue(mockToggleTask);
  });

  it('should call toggleTask with correct id when handleTaskToggle is called', () => {
    const { result } = renderHook(() => useTaskToggleButton());

    act(() => {
      result.current.handleTaskToggle({
        preventDefault: mockPreventDefault,
      } as unknown as React.MouseEvent<HTMLButtonElement>);
    });

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockToggleTask).toHaveBeenCalledWith('task-1');
  });
});
