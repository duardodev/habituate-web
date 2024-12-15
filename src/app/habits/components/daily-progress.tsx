import { TasksMetric } from './tasks-metric';
import { HabitsMetric } from './habits-metric';
import { Activity } from 'lucide-react';

export function DailyProgress() {
  return (
    <div className="relative min-h-[250px] w-[320px] rounded-3xl p-4 bg-white dark:bg-background border border-zinc-200 dark:border-zinc-800 transition-all duration-300 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
          <Activity className="w-6 h-6 text-primary" />
        </div>

        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Progresso diário</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Sua atividade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-8">
        <HabitsMetric />
        <TasksMetric />
      </div>
    </div>
  );
}
