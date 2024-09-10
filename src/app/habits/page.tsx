import { Suspense } from 'react';
import { Calendar } from '@/app/habits/components/calendar';
import { Habits } from './components/habits';
import { SkeletonHabit } from './components/skeleton-habit';

export default function HabitsPage() {
  return (
    <div className="flex flex-col overflow-x-auto min-[530px]:overflow-visible">
      <Calendar />
        <Suspense fallback={<SkeletonHabit />}>
          <Habits />
        </Suspense>
    </div>
  );
}
