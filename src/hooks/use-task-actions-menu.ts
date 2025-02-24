import { useActiveTaskEditingContext } from './use-active-task-editing-context';

export function useTaskActionsMenu(id: string) {
  const { activeTaskEditingId } = useActiveTaskEditingContext();
  const isTitleEditing = activeTaskEditingId === id;

  return {
    isTitleEditing,
  };
}
