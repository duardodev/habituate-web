export interface HabitsResponse {
  habits: {
    id: string;
    title: string;
    emoji: string;
  }[];
}

export async function useFetchHabits(token: string | null, userId?: string | null): Promise<HabitsResponse> {
  function cacheTag(tag: string) {
    return `${tag}/${userId}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/habits`, {
    next: {
      revalidate: 3600,
      tags: [cacheTag('add-habit'), cacheTag('delete-habit'), cacheTag('update-habit-title')],
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
