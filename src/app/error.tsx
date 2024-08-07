'use client';

import { Button } from '@/components/ui/button';

export default function Error({}: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center gap-3">
        <h2>Algo deu errado!</h2>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Tente novamente
        </Button>
      </div>
    </div>
  );
}
