import { useActiveTaskEditingContext } from '@/hooks/use-active-task-editing-context';
import { useTaskActionsMenu } from '@/hooks/use-task-actions-menu';
import { renderHook } from '@testing-library/react';

jest.mock('@/hooks/use-active-task-editing-context');

describe('useTasksActionsMenu hook', () => {
  const mockId = 'habit-1';

  beforeEach(() => {
    jest.clearAllMocks();

    (useActiveTaskEditingContext as jest.Mock).mockReturnValue({
      activeTaskEditingId: mockId,
    });
  });

  it('should indicate task is being edited when provided ID matches the active editing ID', () => {
    const { result } = renderHook(() => useTaskActionsMenu(mockId));
    expect(result.current.isTitleEditing).toBe(true);
  });

  it('should indicate task is not being edited when provided ID differs from active editing ID', () => {
    const { result } = renderHook(() => useTaskActionsMenu('habit-2'));
    expect(result.current.isTitleEditing).toBe(false);
  });
});
