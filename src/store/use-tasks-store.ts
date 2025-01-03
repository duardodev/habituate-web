import dayjs, { Dayjs } from 'dayjs';
import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Task {
  id: string;
  title: string;
  priority: 'p1' | 'p2' | 'p3';
  completed: boolean;
  expiresAt?: number | null;
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

function cleanExpiredTasks(tasks: Task[]) {
  const now = dayjs().utc();
  return tasks.filter(task => !task.expiresAt || dayjs(task.expiresAt).isAfter(now));
}

export const useTasksStore = create<TasksStore>()(
  persist(
    (set, get) => ({
      tasks: cleanExpiredTasks([]),
      amountCompletedTasks: () => get().tasks.filter(task => task.completed).length,
      amountTasks: () => get().tasks.length,
      addTask: newTask =>
        set(
          produce((draft: TasksStore) => {
            draft.tasks.push(newTask);

            const priorityOrder: Record<'p1' | 'p2' | 'p3', number> = { p1: 1, p2: 2, p3: 3 };

            draft.tasks.sort((a, b) => {
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
          })
        ),
      toggleTask: id =>
        set(
          produce((draft: TasksStore) => {
            const task = draft.tasks.find(task => task.id === id);

            if (task) {
              task.completed = !task.completed;
              task.expiresAt = task.completed
                ? dayjs().tz(dayjs.tz.guess()).add(1, 'day').startOf('day').utc().valueOf()
                : null;
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
      partialize: state => ({ tasks: cleanExpiredTasks(state.tasks) }),
    }
  )
);
