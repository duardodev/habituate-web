import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  priority: string;
  completed: boolean;
}

interface TasksStore {
  tasks: Task[];
  amountCompletedTasks: () => number;
  amountTasks: () => number;
  addTask: (newTask: Task) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  updateTaskTitle: (id: string, newTitle: string) => void;
  removeAllTasks: () => void;
}

export const useTasksStore = create<TasksStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      amountCompletedTasks: () => get().tasks.filter(task => task.completed).length,
      amountTasks: () => get().tasks.length,
      addTask: newTask =>
        set(
          produce((draft: TasksStore) => {
            draft.tasks.push(newTask);
          })
        ),
      toggleTask: id =>
        set(
          produce((draft: TasksStore) => {
            const task = draft.tasks.find(task => task.id === id);

            if (task) {
              task.completed = !task.completed;
            }
          })
        ),
      removeTask: id =>
        set(
          produce((draft: TasksStore) => {
            draft.tasks = draft.tasks.filter(task => task.id !== id);
          })
        ),
      updateTaskTitle: (id, newTitle) =>
        set(
          produce((draft: TasksStore) => {
            const task = draft.tasks.find(task => task.id === id);

            if (task) {
              task.title = newTitle;
            }
          })
        ),
      removeAllTasks: () =>
        set(
          produce((draft: TasksStore) => {
            draft.tasks = [];
          })
        ),
    }),
    {
      name: 'tasks',
      partialize: state => ({ tasks: state.tasks }),
    }
  )
);
