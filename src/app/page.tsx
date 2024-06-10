import { Calendar } from '@/components/calendar';
import { Habits } from '@/components/habits';

export default function Home() {
  return (
    <main className="max-w-[820px] p-6 mx-auto flex flex-col">
      <Calendar />
      <Habits />
    </main>
  );
}
