import { Skeleton } from '@/components/ui/skeleton';

export function HabitSkeleton() {
  const checkboxs = Array.from({ length: 7 });

  return (
    <div className="w-full max-w-[852px] mx-auto px-0 mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="h-[26px] w-[26px]" />
        <Skeleton className="h-5 w-40 rounded-xl" />
      </div>

      <div className="flex space-x-6">
        {checkboxs.map((_, i) => {
          return <Skeleton key={i} className="h-7 w-7" />;
        })}
      </div>
    </div>
  );
}
