import { Circle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskProps {
  title: string;
  priority: string;
}

export function Task({ title, priority }: TaskProps) {
  return (
    <div className="p-3 flex items-center gap-3 group">
      <button type="submit" className="flex-none">
        <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
      </button>

      <div className="flex-1 flex gap-3 min-w-0">
        <p className="text-sm text-zinc-900 dark:text-zinc-100">{title}</p>

        <span
          className={cn(
            'flex items-center justify-center text-xs px-1.5 py-0.5 rounded-md font-medium',
            priority === 'p1' && 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
            priority === 'p2' && 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
            priority === 'p3' && 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
          )}
        >
          {(priority === 'p1' && 'Alta') || (priority === 'p2' && 'Média') || (priority === 'p3' && 'Baixa')}
        </span>
      </div>

      <button type="button" className="opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity">
        <MoreHorizontal className="w-5 h-5 text-zinc-400" />
      </button>
    </div>
  );
}
