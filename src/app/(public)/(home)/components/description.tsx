'use client';

import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const words = `Habituate helps you build, manage, and maintain positive habits.
Start your journey to a better you today!`;

export function Description() {
  return (
    <TextGenerateEffect
      duration={1.5}
      filter={false}
      words={words}
      className="max-w-[650px] text-secondary-foreground/95 text-center text-lg md:text-xl"
    />
  );
}
