'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ButtonsProps {
  userId: string | null;
}

export function Buttons({ userId }: ButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      viewport={{
        once: true,
      }}
      className="mt-2 flex flex-wrap justify-center items-center gap-4"
    >
      <Button className="h-9 border-none font-semibold" asChild>
        <Link href={userId ? '/management' : '/auth/sign-in'}>Get Started</Link>
      </Button>

      <Button
        variant="outline"
        asChild
        className="h-9 font-semibold bg-secondary-foreground/95 text-background hover:text-background hover:bg-secondary-foreground/85"
      >
        <Link href="https://github.com/duardodev/habituate-web" target="_blank">
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Link>
      </Button>
    </motion.div>
  );
}
