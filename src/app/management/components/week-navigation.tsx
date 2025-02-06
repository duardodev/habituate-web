'use client';

import { useWeekNavigation } from '@/hooks/use-week-navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export function WeekNavigation() {
  const { handleGoToNextWeek, handleGoToPreviousWeek, currentDate } = useWeekNavigation();

  return (
    <div className="flex items-center gap-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Go to previous week" onClick={handleGoToPreviousWeek}>
              <ChevronLeft className="text-foreground/95 h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to previous week</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Go to next week"
              disabled={currentDate.isToday()}
              onClick={handleGoToNextWeek}
            >
              <ChevronRight className={cn('text-foreground/95 h-5 w-5', currentDate.isToday() && 'opacity-60')} />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Go to next week</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
