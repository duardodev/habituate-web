'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function AddHabitButton() {
  const { pending } = useFormStatus();
  const [wasPending, setWasPending] = useState(false);

  async function handleStatusChange() {
    if (wasPending && !pending) {
      toast.success('Hábito adicionado com sucesso!');
      setWasPending(false);
    }
    if (pending) {
      await new Promise(resolve => setInterval(resolve, 600));
      setWasPending(true);
    }
  }

  useEffect(() => {
    handleStatusChange();
  }, [pending]);

  return (
    <Button type="submit" disabled={pending} className="bg-primary/80">
      {pending && <Loader2 className="mr-2 h-[18px] w-[18px] animate-spin" />}
      {pending ? <span>Adicionando</span> : <span>Adicionar</span>}
    </Button>
  );
}
