import { Skeleton } from '@/components/ui/skeleton';

export function PreviewSkeleton() {
  return (
    <div className="max-w-[650px] w-full flex justify-center">
      <Skeleton className="w-full max-w-[650px] aspect-[650/402] bg-secondary rounded-2xl" />
    </div>
  );
}
