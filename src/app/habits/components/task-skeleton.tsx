import { Skeleton } from '@/components/ui/skeleton';

export function TaskSkeleton() {
  return (
    <div className="p-3 flex items-center gap-3">
      <Skeleton className="w-5 h-5 rounded-full" />

      <div className="flex-1 flex gap-3 min-w-0">
        <Skeleton className="w-24 h-5 rounded-md" />
        <Skeleton className="w-16 h-5 rounded-md" />
      </div>
    </div>
  );
}
