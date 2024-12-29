import { useQuery } from '@tanstack/react-query';
import { useFetchHabits } from './use-fetch-habits';
import { useAuth } from '@clerk/nextjs';

export function useHabitsQuery() {
  const { getToken } = useAuth();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['get-habits'],
    queryFn: async () => {
      const token = await getToken();
      return await useFetchHabits(token);
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
