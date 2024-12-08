import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Calendar } from './components/calendar';
import { Habits } from './components/habits';
import { SkeletonHabit } from './components/skeleton-habit';
import { Tasks } from './components/tasks';
import { ErrorFallback } from './components/error-fallback';
import { Separator } from '@/components/ui/separator';

export default function HabitsPage() {
  return (
    <div className="flex flex-col overflow-visible min-h-screen">
      <div className="mt-6 w-full max-w-[832px] mx-auto">
        <div className="overflow-x-hidden rounded-2xl border border-border bg-white shadow-lg dark:bg-background">
          <div className="overflow-x-auto p-4">
            <div className="min-w-max">
              <Calendar />

              <Separator className="mt-4" />

              <ErrorBoundary
                fallback={
                  <ErrorFallback message="Não foi possível carregar os dados dos hábitos. Por favor, espere um pouco e tente novamente recarregando a página." />
                }
              >
                <Suspense fallback={<SkeletonHabit />}>
                  <Habits />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[832px] mx-auto mt-6">
        <Tasks />
      </div>
    </div>
  );
}
