'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export function AddHabitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="bg-primary/80">
      {pending && <Loader2 className="mr-2 h-[18px] w-[18px] animate-spin" />}
      {pending ? <span>Adicionando</span> : <span>Adicionar</span>}
    </Button>
  );
}
