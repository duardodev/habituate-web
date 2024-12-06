import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';

interface TasksResponse {
  tasks: {
    id: string;
    title: string;
    priority: string;
    completed: boolean;
  }[];
}

export async function useTasks(): Promise<TasksResponse> {
  const { getToken } = auth();
  const token = await getToken();

  const tasksResponse = await api('/tasks', {
    next: {
      revalidate: 3600,
      tags: ['get-tasks'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: TasksResponse = await tasksResponse.json();
  return data;
}
