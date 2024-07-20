import { Calendar } from '@/app/habits/components/calendar';
import { Habits } from './components/habits';

export default function HabitsPage() {
  return (
    <div className="flex flex-col overflow-x-auto min-[530px]:overflow-visible">
      <Calendar />
      <Habits />
    </div>
  );
}
