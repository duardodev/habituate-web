'use client';

import { MetricRing } from './metric-ring';
import { MetricRingSkeleton } from './metric-ring-skeleton';
import { useHabitsMetric } from '@/hooks/use-habits-metric';
import { useHabitsQuery } from '@/hooks/use-habits-query';

export function HabitsMetric() {
  const { completedHabitsCount, percentage } = useHabitsMetric();
  const { isLoading, isError } = useHabitsQuery();

  if (isLoading) {
    return <MetricRingSkeleton label="Hábitos" sublabel="feito(s)" />;
  }

  if (isError) {
    return <MetricRing label="Hábitos" sublabel="feito(s)" value={0} percentage={0} />;
  }

  return <MetricRing label="Hábitos" sublabel="feito(s)" value={completedHabitsCount} color="#2CD758" percentage={percentage} />;
}
