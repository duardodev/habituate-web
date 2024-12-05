'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TooltipProps = {
  text: string;
} & React.ComponentProps<'div'>;

export function Tooltip({ text, children, className }: TooltipProps) {
  const [isToastVisible, setIsToastVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <motion.div
        className={cn(
          'absolute -top-4 left-1/2 whitespace-nowrap rounded-md border border-border dark:bg-neutral-900 bg-neutral-50 px-2 py-1 text-xs text-foreground shadow [translate:-50%_-50%]',
          className
        )}
        initial={{ opacity: 0, y: 5, filter: 'blur(4px)', scale: 0.9 }}
        animate={{
          opacity: isToastVisible ? 1 : 0,
          y: isToastVisible ? 0 : 5,
          filter: isToastVisible ? 'blur(0px)' : 'blur(4px)',
          scale: isToastVisible ? 1 : 0.9,
        }}
        transition={{ ease: 'easeInOut', duration: 0.15 }}
      >
        <span>{text}</span>
      </motion.div>

      <div onMouseEnter={() => setIsToastVisible(true)} onMouseLeave={() => setIsToastVisible(false)}>
        {children}
      </div>
    </div>
  );
}
