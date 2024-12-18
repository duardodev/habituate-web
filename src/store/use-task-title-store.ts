import { create } from 'zustand';

interface TaskTitleStore {
  activeEditingTaskId: string | null; // Armazena o ID da task sendo   editada
  toggleEditingTask: (id: string) => void; // Define qual task está sendo editada
}

export const useTaskTitleStore = create<TaskTitleStore>()(set => ({
  activeEditingTaskId: null,
  toggleEditingTask: (id: string) =>
    set(state => ({
      activeEditingTaskId: state.activeEditingTaskId === id ? null : id,
    })),
}));
