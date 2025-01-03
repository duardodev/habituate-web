import { Skeleton } from '@/components/ui/skeleton';

export function MonthYearDisplaySkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-[1.3rem] w-7" />
      <Skeleton className="h-[1.3rem] w-10" />
    </div>
  );
}
