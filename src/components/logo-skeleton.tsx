import { Skeleton } from './ui/skeleton';

export function LogoSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-8 h-8" />
      <Skeleton className="h-6 w-24 rounded-lg" />
    </div>
  );
}
