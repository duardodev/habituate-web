import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Calendar } from './components/calendar';
import { Habits } from './components/habits';
import { SkeletonHabit } from './components/skeleton-habit';
import { HabitsErrorFallback } from './components/habits-error-fallback';

export default function HabitsPage() {
  return (
    <div className="flex flex-col overflow-x-auto min-[530px]:overflow-visible">
      <Calendar />

      <ErrorBoundary fallback={<HabitsErrorFallback />}>
        <Suspense fallback={<SkeletonHabit />}>
          <Habits />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
