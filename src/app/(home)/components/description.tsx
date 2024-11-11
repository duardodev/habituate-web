'use client';

import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const words = `Habituate ajuda você construir, gerenciar, e manter hábitos positivos.
Comece sua jornada para um você melhor hoje.`;

export function Description() {
  return (
    <TextGenerateEffect
      duration={1.5}
      filter={false}
      words={words}
      className="w-[740px] text-secondary-foreground/95 text-center text-lg md:text-xl"
    />
  );
}
