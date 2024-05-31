'use client';

import { useState } from 'react';
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
  const [currentDate, setCurrentDate] = useState(dayjs());
  const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.add(i, 'day'));
  const currentMonth = monthsNames[currentDate.month()];
  const currentYear = currentDate.year();

  function handleGoToPreviuosWeek() {
    setCurrentDate(prev => prev.subtract(1, 'week'));
  }

  function handleGoToNextWeek() {
    setCurrentDate(prev => prev.add(1, 'week'));
  }

  return (
    <>
      <div className="flex items-center gap-x-3">
        <h2 className="text-foreground/95">
          {currentMonth} {currentYear}
        </h2>

        <div className="flex gap-x-2">
          <button aria-label="go to previous week" onClick={handleGoToPreviuosWeek}>
            <ChevronLeft className="text-foreground/55 h-5 w-5" />
          </button>

          <button aria-label="go to next week" disabled={currentDate.isToday()} onClick={handleGoToNextWeek}>
            <ChevronRight className={cn('text-foreground/55 h-5 w-5', currentDate.isToday() && 'opacity-50')} />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {currentWeekDays.map(currentWeekDay => {
          return (
            <p key={currentWeekDay.toString()} className="text-sm text-center text-foreground/70">
              {daysNames[currentWeekDay.day()]}
              <span className="block">{currentWeekDay.format('DD')}</span>
            </p>
          );
        })}
      </div>
    </>
  );
}
