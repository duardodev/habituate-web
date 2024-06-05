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
import { AddHabitButton } from './add-habit-button';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { api } from '@/functions/api';

export function AddHabitDialog() {
  async function handleAddHabit(form: FormData) {
    'use server';

    const title = form.get('title');

    if (!title) {
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 600));

    await api('/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-5 w-5 mr-2" />
          Novo hábito
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Novo hábito</DialogTitle>
          <DialogDescription className="text-base leading-tight">Adicione um novo hábito à sua rotina.</DialogDescription>
        </DialogHeader>

        <form action={handleAddHabit} className="space-y-4">
          <Input
            id="title"
            name="title"
            placeholder="Título do hábito"
            className="text-base w-full placeholder:text-foreground/70"
            autoComplete="off"
            required
          />

          <DialogFooter className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-[42px]">
                Cancelar
              </Button>
            </DialogClose>

            <AddHabitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
