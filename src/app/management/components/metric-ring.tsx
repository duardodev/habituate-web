interface MetricRingProps {
  label: string;
  value: number;
  color?: string;
  percentage?: number;
}

export function MetricRing({ label, value, color, percentage = 0 }: MetricRingProps) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-[6px] border-zinc-200 dark:border-zinc-800/50" />

        <div
          className="absolute inset-0 rounded-full border-[6px]"
          style={{
            borderColor: color,
            clipPath: `polygon(0 0, 100% 0, 100% ${percentage}%, 0 ${percentage}%)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span data-testid="metric-value" className="text-xl font-bold  text-zinc-900 dark:text-zinc-100">
            {value}
          </span>
          <span className="text-xs lowercase text-zinc-500 dark:text-zinc-400">done</span>
        </div>
      </div>

      <span className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      <span data-testid="metric-percentage" className="text-xs text-zinc-500">
        {percentage.toString().slice(0, 4)}%
      </span>
    </div>
  );
}
