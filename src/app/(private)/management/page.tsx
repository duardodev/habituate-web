import { Suspense } from 'react';
import { Calendar } from './components/calendar';
import { Habits } from './components/habits';
import { HabitSkeleton } from './components/habit-skeleton';
import { Tasks } from './components/tasks';
import { Separator } from '@/components/ui/separator';
import { DailyProgress } from './components/daily-progress';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/error-fallback';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { useGetQueryClient } from '@/hooks/use-get-query-client';

export default async function ManagementPage() {
  const queryClient = useGetQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col overflow-visible">
        <div className="mt-9 w-full max-w-[828px] mx-auto">
          <div className="overflow-x-hidden rounded-2xl border border-border bg-white shadow-lg dark:bg-background">
            <div className="overflow-x-auto p-4">
              <div className="min-w-max">
                <Calendar />

                <Separator className="mt-4" />

                <ErrorBoundary
                  fallback={
                    <ErrorFallback message="Failed to load habits data. Please wait a moment and try again by reloading the page." />
                  }
                >
                  <Suspense fallback={<HabitSkeleton />}>
                    <Habits />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[828px] mx-auto mt-8 pb-5 flex flex-wrap justify-center gap-x-20 gap-y-10">
          <Tasks />
          <DailyProgress />
        </div>
      </div>
    </HydrationBoundary>
  );
}
