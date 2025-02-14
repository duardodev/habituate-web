'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="bg-primary/80">
      {pending && <Loader2 data-testid="loader" className="mr-2 h-[18px] w-[18px] animate-spin" />}
      {pending ? <span>Confirming</span> : <span>Confirm</span>}
    </Button>
  );
}
