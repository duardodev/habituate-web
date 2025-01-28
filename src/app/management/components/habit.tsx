import { Checkboxes } from './checkboxes';
import { EmojiPickerButton } from './emoji-picker-button';
import { HabitTitle } from './habit-title';
import { useHabit } from '@/hooks/use-habit';

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
