'use client';

import { useWeekNavigation } from '@/hooks/use-week-navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WeekNavigation() {
  const { handleGoToNextWeek, handleGoToPreviousWeek, currentDate } = useWeekNavigation();

  return (
    <div className="flex gap-x-2">
      <button aria-label="Navegar para semana anterior" onClick={handleGoToPreviousWeek}>
        <ChevronLeft className="text-foreground/95 h-5 w-5" />
      </button>

      <button
        aria-label="Navegar para próxima semana"
        disabled={currentDate.isToday()}
        onClick={handleGoToNextWeek}
      >
        <ChevronRight
          className={cn('text-foreground/95 h-5 w-5', currentDate.isToday() && 'opacity-60')}
        />
      </button>
    </div>
  );
}
