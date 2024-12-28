import { Skeleton } from '@/components/ui/skeleton';

interface MetricRingSkeletonProps {
  label: string;
  sublabel: string;
}

export function MetricRingSkeleton({ label, sublabel }: MetricRingSkeletonProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-[6px] border-zinc-200 dark:border-zinc-800/50" />

        <div
          className="absolute inset-0 rounded-full border-[6px]"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% 0%, 0 0%)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Skeleton className="h-5 w-5 rounded-lg mb-1" />
          <span className="text-xs lowercase text-zinc-500 dark:text-zinc-400">{sublabel}</span>
        </div>
      </div>

      <span className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      <Skeleton className="h-4 w-5 mt-[2px]" />
    </div>
  );
}
