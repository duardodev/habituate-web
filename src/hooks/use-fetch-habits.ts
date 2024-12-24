export interface HabitsResponse {
  habits: {
    id: string;
    title: string;
  }[];
}

export async function useFetchHabits(token: string | null): Promise<HabitsResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/habits`, {
    next: {
      tags: ['get-habits'],
    },
    cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: HabitsResponse = await response.json();
  return data;
}
