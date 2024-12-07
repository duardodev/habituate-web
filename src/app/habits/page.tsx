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
    <div className="flex flex-col overflow-x-hidden min-[530px]:overflow-visible">
      <ErrorBoundary
        fallback={
          <div>
            <Calendar />
            <ErrorFallback message="Não foi possível carregar os dados dos hábitos e tarefas. Por favor, tente novamente recarregando a página." />
          </div>
        }
      >
        <div className="w-full max-w-[852px] mx-auto pb-4 min-[530px]:pb-0 px-0 min-[530px]:px-3 overflow-x-auto min-[530px]:overflow-x-hidden">
          <Calendar />

          <Suspense fallback={<SkeletonHabit />}>
            <Habits />
          </Suspense>
        </div>

        <div className="w-full max-w-[852px] mx-auto px-0 min-[530px]:px-3 mt-6">
          <Separator />
          <Tasks />
        </div>
      </ErrorBoundary>
    </div>
  );
}
