'use client';

import { removeHabit } from '@/app/actions';
import { Checkboxes } from './checkboxes';
import { HabitTitle } from './habit-title';
import { useHabit } from '@/hooks/use-habit';

interface HabitProps {
  id: string;
}

export async function Habit({ id }: HabitProps) {
  const { isTitleEditing, handleHabitTitleUpdate, startEditing } = useHabit({ id });

  return (
    <li className="flex items-center justify-between gap-10">
      <HabitTitle />
      <Checkboxes habitId={id} />
    </li>
  );
}
