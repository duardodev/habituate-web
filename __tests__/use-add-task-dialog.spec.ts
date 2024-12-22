import { renderHook, act } from '@testing-library/react';
import { useAddTaskDialog } from '@/hooks/use-add-task-dialog';
import { useTasksStore } from '@/store/use-tasks-store';
import { toast } from 'sonner';

jest.mock('@/store/use-tasks-store', () => ({
  useTasksStore: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockFormData = {
  get: jest.fn(),
};

(global as any).FormData = jest.fn(() => mockFormData);

describe('useAddTaskDialog', () => {
  const mockAddTask = jest.fn();
  const mockEvent = {
    preventDefault: jest.fn(),
    currentTarget: {
      elements: {
        namedItem: jest.fn().mockReturnValue({ value: 'test task' }),
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksStore as unknown as jest.Mock).mockReturnValue(mockAddTask);

    mockFormData.get.mockImplementation((key: string) => {
      if (key === 'title') return 'test task';
      if (key === 'priority') return 'p2';
      return null;
    });
  });

  it('should add a task with valid data', () => {
    const { result } = renderHook(() => useAddTaskDialog());

    act(() => {
      result.current.handleSubmit(mockEvent as any);
    });

    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'test task',
        priority: 'p2',
        completed: false,
      })
    );

    expect(toast.success).toHaveBeenCalledWith('Tarefa adicionada com sucesso!');
  });

  it('should show error toast when title is empty', () => {
    const { result } = renderHook(() => useAddTaskDialog());

    mockFormData.get.mockImplementation((key: string) => {
      if (key === 'title') return '';
      if (key === 'priority') return 'p1';
      return null;
    });

    act(() => {
      result.current.handleSubmit(mockEvent as any);
    });

    expect(mockAddTask).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('Informe a nova tarefa!');
  });

  it('should clear input after successful submission', () => {
    const mockInput = { value: 'test task' };

    const mockEventWithInput = {
      ...mockEvent,
      currentTarget: {
        elements: {
          namedItem: jest.fn().mockReturnValue(mockInput),
        },
      },
    };

    const { result } = renderHook(() => useAddTaskDialog());

    act(() => {
      result.current.handleSubmit(mockEventWithInput as any);
    });

    expect(mockInput.value).toBe('');
  });

  it('should generate unique IDs for tasks', () => {
    const { result } = renderHook(() => useAddTaskDialog());
    const tasks: string[] = [];

    for (let i = 0; i < 3; i++) {
      act(() => {
        result.current.handleSubmit(mockEvent as any);
      });

      const lastCall = mockAddTask.mock.calls[i][0];
      tasks.push(lastCall.id);
    }

    const uniqueIds = new Set(tasks);
    expect(uniqueIds.size).toBe(tasks.length);
  });
});
