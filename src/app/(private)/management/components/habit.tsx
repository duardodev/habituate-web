import dynamic from 'next/dynamic';
import { Checkboxes } from './checkboxes';
import { HabitTitle } from './habit-title';
import { Skeleton } from '@/components/ui/skeleton';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompletedDatesForHabit } from '@/app/api/get-completed-dates-for-habit';
import { useGetQueryClient } from '@/hooks/use-get-query-client';
import { auth } from '@clerk/nextjs/server';

const EmojiPickerButton = dynamic(() => import('./emoji-picker-button').then(mod => mod.EmojiPickerButton), {
  loading: () => <Skeleton className="h-[26px] w-[26px]" />,
  ssr: false,
});

interface HabitProps {
  id: string;
}

export async function Habit({ id }: HabitProps) {
  const { getToken } = auth();
  const queryClient = useGetQueryClient();
  const token = await getToken();

  await queryClient.prefetchQuery({
    queryKey: ['completed-dates-for-habit', id],
    queryFn: () => getCompletedDatesForHabit(id, token),
  });

  return (
    <li className="flex items-center justify-between gap-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex items-center gap-2">
          <EmojiPickerButton />
          <HabitTitle />
        </div>
        <Checkboxes />
      </HydrationBoundary>
    </li>
  );
}
