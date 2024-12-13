'use client';

import { MetricRing } from './metric-ring';
import { MetricRingSkeleton } from './metric-ring-skeleton';
import { useHabitsMetric } from '@/hooks/use-habits-metric';

export function HabitsMetric() {
  const { completedHabitsCount, percentage, isLoading } = useHabitsMetric();

  if (isLoading) {
    return <MetricRingSkeleton label="Hábitos" sublabel="feito(s)" />;
  }

  return <MetricRing label="Hábitos" sublabel="feito(s)" value={completedHabitsCount} color="#2CD758" percentage={percentage} />;
}
