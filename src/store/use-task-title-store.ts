import { create } from 'zustand';

interface TaskTitleStore {
  isTitleEditing: boolean;
  setIsTitleEditing: () => void;
}

export const useTaskTitleStore = create<TaskTitleStore>()(set => ({
  isTitleEditing: false,
  setIsTitleEditing: () => set(state => ({ isTitleEditing: !state.isTitleEditing })),
}));
