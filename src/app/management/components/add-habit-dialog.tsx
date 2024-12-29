'use client';

import { ConfirmButton } from './confirm-button';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddHabitDialog } from '@/hooks/use-add-habit-dialog';
import { Plus } from 'lucide-react';
import { useHabitsQuery } from '@/hooks/use-habits-query';

export function AddHabitDialog() {
  const { handleAddHabit } = useAddHabitDialog();
  const { isLoading, isError } = useHabitsQuery();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isLoading || isError}>
          <Plus className="h-5 w-5 mr-2" />
          Adicionar hábito
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>Adcionar novo hábito</DialogTitle>
          <DialogDescription className="text-base leading-tight">
            Adicione um hábito que você constuma praticar.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleAddHabit(new FormData(e.currentTarget));
            e.currentTarget.reset();
          }}
          className="space-y-4"
        >
          <Input
            name="title"
            placeholder="Meditar, exercitar-se, estudar inglês..."
            className="placeholder:text-foreground/70"
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
