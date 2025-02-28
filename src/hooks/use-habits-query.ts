import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { getHabits } from '@/app/api/get-habits';

export function useHabitsQuery() {
  const { getToken } = useAuth();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['get-habits'],
    queryFn: async () => {
      const token = await getToken();
      return await getHabits(token);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  };
}
