import { Skeleton } from '@/components/ui/skeleton';

export function WeekDaysSkeleton() {
  return (
    <div className="flex gap-x-6">
      {Array.from({ length: 7 }, (_, i) => (
        <Skeleton key={i} className="h-9 w-7" />
      ))}
    </div>
  );
}
