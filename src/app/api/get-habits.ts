export interface HabitsResponse {
  habits: {
    id: string;
    title: string;
    emoji: string;
  }[];
}

export async function getHabits(token: string | null): Promise<HabitsResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/habits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { habits }: HabitsResponse = await response.json();

  return {
    habits,
  };
}
