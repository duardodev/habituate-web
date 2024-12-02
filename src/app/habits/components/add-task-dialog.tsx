'use client';

import { PrioritySelect } from './priority-select';
import { ConfirmButton } from './confirm-button';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { addTask } from '@/app/actions';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function AddTaskDialog() {
  async function handleAddTask(form: FormData) {
    const title = form.get('title') as string;

    if (!title || title.trim() === '') {
      toast.error('Informe a nova tarefa!');
      return;
    }

    const response = await addTask(form);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Tarefa adicionada com sucesso!');
  }

  return (
    <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex justify-start items-center gap-2 w-full px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 
                    hover:text-zinc-600 dark:hover:text-zinc-300 
                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                    rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar nova tarefa
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[460px]">
          <DialogHeader>
            <DialogTitle>Adicionar tarefa</DialogTitle>
            <DialogDescription className="text-base leading-tight">Adicione uma nova tarefa.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={e => {
              e.preventDefault();
              handleAddTask(new FormData(e.currentTarget));
            }}
            className="space-y-4"
          >
            <div className="flex justify-between gap-4">
              <Input
                name="title"
                placeholder="Pagar conta de luz, etc..."
                className="placeholder:text-foreground/70 w-3/5"
                autoComplete="off"
              />

              <PrioritySelect />
            </div>

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
    </div>
  );
}
