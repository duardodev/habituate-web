'use client';

import { ConfirmButton } from './confirm-button';
import { PriorityItem } from './priority-item';
import { useAddTaskDialog } from '@/hooks/use-add-task-dialog';
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
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

export function AddTaskDialog() {
  const { handleSubmit } = useAddTaskDialog();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-start items-center gap-2 w-full px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add new task
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription className="text-base leading-tight">Add a task to do today.</DialogDescription>
        </DialogHeader>

        <form onSubmit={e => handleSubmit(e)} className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Input
              name="title"
              placeholder="Pay electricity bill, etc..."
              className="placeholder:text-foreground/70 w-full sm:w-3/5"
              autoComplete="off"
            />

            <div className="w-full sm:w-2/5 group relative">
              <label
                htmlFor="select-28"
                className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
              >
                Select priority
              </label>

              <Select defaultValue="p1" name="priority">
                <SelectTrigger id="select-28">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                  <PriorityItem value="p1" name="High" className="text-red-500" />
                  <PriorityItem value="p2" name="Medium" className="text-amber-500" />
                  <PriorityItem value="p3" name="Low" className="text-blue-500" />
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-[42px]">
                Cancel
              </Button>
            </DialogClose>

            <ConfirmButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
