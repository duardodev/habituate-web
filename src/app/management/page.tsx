import { Suspense } from 'react';
import { Calendar } from './components/calendar';
import { Habits } from './components/habits';
import { HabitSkeleton } from './components/habit-skeleton';
import { Tasks } from './components/tasks';
import { Separator } from '@/components/ui/separator';
import { DailyProgress } from './components/daily-progress';

export default function ManagementPage() {
  return (
    <div className="flex flex-col overflow-visible min-h-screen">
      <div className="mt-9 w-full max-w-[828px] mx-auto">
        <div className="overflow-x-hidden rounded-2xl border border-border bg-white shadow-lg dark:bg-background">
          <div className="overflow-x-auto p-4">
            <div className="min-w-max">
              <Calendar />

              <Separator className="mt-4" />

              <Suspense fallback={<HabitSkeleton />}>
                <Habits />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[828px] mx-auto mt-8 pb-5 flex flex-wrap justify-center gap-x-20 gap-y-10">
        <Tasks />
        <DailyProgress />
      </div>
    </div>
  );
}
