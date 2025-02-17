import dynamic from 'next/dynamic';
import { Checkboxes } from './checkboxes';
import { HabitTitle } from './habit-title';
import { useHabit } from '@/hooks/use-habit';
import { Skeleton } from '@/components/ui/skeleton';

const EmojiPickerButton = dynamic(() => import('./emoji-picker-button').then(mod => mod.EmojiPickerButton), {
  loading: () => <Skeleton className="h-[26px] w-[26px]" />,
  ssr: false,
});

interface HabitProps {
  id: string;
}

export async function Habit({ id }: HabitProps) {
  const datesTheHabitWasCompleted = await useHabit({ id });

  return (
    <li className="flex items-center justify-between gap-10">
      <div className="flex items-center gap-2">
        <EmojiPickerButton />
        <HabitTitle />
      </div>
      <Checkboxes datesTheHabitWasCompleted={datesTheHabitWasCompleted} />
    </li>
  );
}
