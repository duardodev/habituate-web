'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'bg-zinc-300/80 hover:bg-zinc-300/90 dark:bg-zinc-700/40 dark:hover:bg-zinc-700/60 border border-foreground/5 peer h-7 w-7 shrink-0 rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-300/25 dark:disabled:bg-zinc-700/5 data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary transition-colors',
      className
    )}
    checked={checked}
    aria-label="Caixa de seleção"
    {...props}
  >
    <CheckboxPrimitive.Indicator />
  </CheckboxPrimitive.Root>
));
('');
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
