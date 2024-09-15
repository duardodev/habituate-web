import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';

interface HabitsResponse {
  habits: {
    id: string;
    title: string;
  }[];
}

export async function useHabits(): Promise<HabitsResponse> {
  const { getToken } = auth();
  const token = await getToken();

  const response = await api('/habits', {
    next: {
      revalidate: 3600,
      tags: ['get-habits'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: HabitsResponse = await response.json();
  return data;
}
