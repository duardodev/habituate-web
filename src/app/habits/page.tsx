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
    <div className="flex flex-col overflow-x-hidden">
      <ErrorBoundary
        fallback={
          <div>
            <Calendar />
            <ErrorFallback message="Não foi possível carregar os dados dos hábitos e tarefas. Por favor, tente novamente recarregando a página." />
          </div>
        }
      >
        <div className="pb-4 overflow-x-auto min-[530px]:overflow-x-hidden">
          <Calendar />

          <Suspense fallback={<SkeletonHabit />}>
            <Habits />
          </Suspense>
        </div>

        <Separator className="mt-6" />

        <Tasks />
      </ErrorBoundary>
    </div>
  );
}
