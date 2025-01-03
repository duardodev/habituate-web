import { MonthYearDisplaySkeleton } from './month-year-display-skeleton';
import { WeekDaysSkeleton } from './week-days-skeleton';
import { WeekNavigation } from './week-navigation';
import dynamic from 'next/dynamic';

const MonthYearDisplay = dynamic(() => import('./month-year-display').then(mod => mod.MonthYearDisplay), {
  loading: () => <MonthYearDisplaySkeleton />,
  ssr: false,
});

const WeekDays = dynamic(() => import('./week-days').then(mod => mod.WeekDays), {
  loading: () => <WeekDaysSkeleton />,
  ssr: false,
});

export function Calendar() {
  return (
    <div className="overflow-visible flex items-center justify-between gap-x-10">
      <div className="flex items-center gap-x-3">
        <MonthYearDisplay />
        <WeekNavigation />
      </div>

      <WeekDays />
    </div>
  );
}
