'use client';

import { MetricRing } from './metric-ring';
import { MetricRingSkeleton } from './metric-ring-skeleton';
import { useHabitsMetric } from '@/hooks/use-habits-metric';
import { useHabitsQuery } from '@/hooks/use-habits-query';

export function HabitsMetric() {
  const { completedHabitsCount, percentage } = useHabitsMetric();
  const { isLoading, isError } = useHabitsQuery();

  if (isLoading) {
    return <MetricRingSkeleton label="Habits" />;
  }

  if (isError) {
    return <MetricRing label="Habits" value={0} percentage={0} />;
  }

  return (
    <div data-testid="habits-metric">
      <MetricRing label="Habits" value={completedHabitsCount} color="#2CD758" percentage={percentage} />
    </div>
  );
}
