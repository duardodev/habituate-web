'use client';

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
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Plus } from 'lucide-react';
import { addHabit } from '@/app/actions';
import { toast } from 'sonner';

export function AddHabitDialog() {
  async function handleAddHabit(form: FormData) {
    const title = form.get('title');

    if (!title) {
      toast.error('Informe o nome do hábito!');
      return;
    }

    const response = await addHabit(form);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Hábito adicionado com sucesso!');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-5 w-5 mr-2" />
          Novo hábito
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>Novo hábito</DialogTitle>
          <DialogDescription className="text-base leading-tight">Adicione um novo hábito.</DialogDescription>
        </DialogHeader>

        <form action={handleAddHabit} className="space-y-4">
          <Input name="title" placeholder="Nome do hábito" className="text-base placeholder:text-foreground/70" autoComplete="off" />

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
