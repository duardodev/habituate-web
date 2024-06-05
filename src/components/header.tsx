import { AddHabitDialog } from './add-habit-dialog';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <header className="max-w-[820px] px-6 pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          habituate <span className="text-primary text-[22px]">.</span>
        </h1>

        <AddHabitDialog />
      </div>

      <Separator className="mt-6" />
    </header>
  );
}
