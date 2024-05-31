import { Calendar } from '@/components/calendar';

export default function Home() {
  return (
    <main className="max-w-[820px] p-6 mx-auto flex items-center justify-between">
      <Calendar />
    </main>
  );
}
