'use client';

import { MetricRing } from './metric-ring';
import { useLoading } from '@/hooks/use-loading';
import { MetricRingSkeleton } from './metric-ring-skeleton';
import { useTasksMetric } from '@/hooks/use-tasks-metric';

export function TasksMetric() {
  const { completedTasksCount, percentage } = useTasksMetric();
  const { isLoading } = useLoading();

  if (isLoading) {
    return <MetricRingSkeleton label="Tasks" />;
  }

  return (
    <div data-testid="tasks-metric">
      <MetricRing label="Tasks" value={completedTasksCount} color="#007AFF" percentage={percentage} />;
    </div>
  );
}
