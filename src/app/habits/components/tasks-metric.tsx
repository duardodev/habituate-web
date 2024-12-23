'use client';

import { MetricRing } from './metric-ring';
import { useLoading } from '@/hooks/use-loading';
import { MetricRingSkeleton } from './metric-ring-skeleton';
import { useTasksMetric } from '@/hooks/use-tasks-metric';

export function TasksMetric() {
  const { completedTasksCount, percentage } = useTasksMetric();
  const { isLoading } = useLoading();

  if (isLoading) {
    return <MetricRingSkeleton label="Tarefas" sublabel="feita(s)" />;
  }

  return <MetricRing label="Tarefas" sublabel="feita(s)" value={completedTasksCount} color="#007AFF" percentage={percentage} />;
}
