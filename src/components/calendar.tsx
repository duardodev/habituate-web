'use client';

import { useDateStore } from '@/store/date-store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

const daysNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const monthsNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export function Calendar() {
  const { currentDate, setNewCurrentDate } = useDateStore();
  const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.startOf('week').add(i, 'day'));
  const currentMonth = monthsNames[currentDate.month()];
  const currentYear = currentDate.year();

  function handleGoToPreviuosWeek() {
    setNewCurrentDate(currentDate.subtract(1, 'week'));
  }

  function handleGoToNextWeek() {
    setNewCurrentDate(currentDate.add(1, 'week'));
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <h2 className="text-foreground/95 font-medium">
          {currentMonth} {currentYear}
        </h2>

        <div className="flex gap-x-2">
          <button aria-label="go to previous week" onClick={handleGoToPreviuosWeek}>
            <ChevronLeft className="text-foreground/70 h-5 w-5" />
          </button>
          <button aria-label="go to next week" disabled={currentDate.isToday()} onClick={handleGoToNextWeek}>
            <ChevronRight className={cn('text-foreground/70 h-5 w-5', currentDate.isToday() && 'opacity-60')} />
          </button>
        </div>
      </div>

      <div className="flex gap-x-6">
        {currentWeekDays.map(currentWeekDay => {
          return (
            <p key={currentWeekDay.toString()} className="w-7 text-sm text-center text-foreground/70">
              {daysNames[currentWeekDay.day()]}
              <span className="block">{currentWeekDay.format('DD')}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
