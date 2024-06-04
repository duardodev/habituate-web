import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus } from 'lucide-react';
import { api } from '@/functions/api';

export function CreateHabitDialog() {
  async function handleCreateHabit(form: FormData) {
    'use server';

    const title = form.get('title');

    if (!title) {
      return;
    }

    await api('/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    });

    form.delete('title');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-5 w-5 mr-2" />
          Novo hábito
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo hábito</DialogTitle>
          <DialogDescription className="text-base leading-tight">Adicione um novo hábito à sua rotina.</DialogDescription>
        </DialogHeader>

        <form action={handleCreateHabit} method="POST" className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="title" className="text-base">
              Título do hábito
            </Label>
            <Input id="title" name="title" className="text-base text-foreground/90 max-w-[310px]" autoComplete="off" />
          </div>

          <DialogFooter className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-[42px]">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" className="bg-primary/80">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
