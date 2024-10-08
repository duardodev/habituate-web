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
import { ConfirmButton } from './confirm-button';
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

    toast.success('Hábito cadastrado com sucesso!');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-5 w-5 mr-2" />
          Cadastrar hábito
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>Cadastrar hábito</DialogTitle>
          <DialogDescription className="text-base leading-tight">
            Adicione hábitos diários que você constuma praticar.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleAddHabit(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          <Input
            name="title"
            placeholder="Correr, ler um livro, etc..."
            className="text-base placeholder:text-foreground/70"
            autoComplete="off"
          />

          <DialogFooter className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-[42px]">
                Cancelar
              </Button>
            </DialogClose>

            <ConfirmButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
