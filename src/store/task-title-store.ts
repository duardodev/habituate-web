import { create } from 'zustand';

interface TaskTitleStore {
  activeEditingTaskId: string | null;
  toggleEditingTask: (id: string) => void;
}

export const useTaskTitleStore = create<TaskTitleStore>()(set => ({
  activeEditingTaskId: null,
  toggleEditingTask: (id: string) =>
    set(state => ({
      activeEditingTaskId: state.activeEditingTaskId === id ? null : id,
    })),
}));
