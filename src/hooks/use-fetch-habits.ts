export interface HabitsResponse {
  habits: {
    id: string;
    title: string;
  }[];
}

export async function useFetchHabits(token: string | null): Promise<HabitsResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/habits`, {
    next: {
      revalidate: 3600,
      tags: ['get-habits'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { habits }: HabitsResponse = await response.json();

  return {
    habits,
  };
}
