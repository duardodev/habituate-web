import { useTaskContext } from '@/hooks/use-task-context';
import { useTaskTitle } from '@/hooks/use-task-title';
import { useTaskTitleStore } from '@/store/task-title-store';
import { useTasksStore } from '@/store/tasks-store';
import { act, renderHook } from '@testing-library/react';

jest.mock('@/store/task-title-store');
jest.mock('@/hooks/use-task-context');
jest.mock('@/store/tasks-store');

describe('useTaskTitle hook', () => {
  const mockTaskId = 'task-1';
  const mockToggleEditingTask = jest.fn();
  const mockUpdateTaskTitle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTaskContext as jest.Mock).mockReturnValue({ id: mockTaskId });

    (useTaskTitleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        toggleEditingTask: mockToggleEditingTask,
        activeEditingTaskId: null,
      };

      return selector(state);
    });

    (useTasksStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        updateTaskTitle: mockUpdateTaskTitle,
      };

      return selector(state);
    });
  });

  it('should return correct initial values', () => {
    const { result } = renderHook(() => useTaskTitle());
    expect(result.current.isTitleEditing).toBe(false);
    expect(typeof result.current.handleTaskTitleUpdate).toBe('function');
  });

  it('should update isTitleEditing when activeEditingTaskId matches', () => {
    (useTaskTitleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        toggleEditingTask: mockToggleEditingTask,
        activeEditingTaskId: mockTaskId,
      };

      return selector(state);
    });

    const { result } = renderHook(() => useTaskTitle());

    expect(result.current.isTitleEditing).toBe(true);
  });

  it('should call updateTaskTitle and toggleEditingTask when handleTaskTitleUpdate is called', () => {
    const { result } = renderHook(() => useTaskTitle());

    act(() => {
      result.current.handleTaskTitleUpdate('New task title');
    });

    expect(mockUpdateTaskTitle).toHaveBeenCalledWith(mockTaskId, 'New task title');
    expect(mockToggleEditingTask).toHaveBeenCalledWith(mockTaskId);
  });
});
