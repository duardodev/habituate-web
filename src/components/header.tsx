import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <header className="max-w-[820px] px-6 pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          habituate <span className="text-primary text-[22px]">.</span>
        </h1>

        <Button variant="outline">
          <Plus className="h-5 w-5 mr-2" />
          Criar hábito
        </Button>
      </div>

      <Separator className="mt-6" />
    </header>
  );
}
