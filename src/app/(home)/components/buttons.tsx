'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
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
      {userId ? (
        <Button className="h-9 border-none font-semibold" asChild>
          <Link href="/management">
            Começar
            <ArrowRight className="h-[18px] w-[18px] ml-2" />
          </Link>
        </Button>
      ) : (
        <Button className="h-9 border-none font-semibold" asChild>
          <Link href="/auth/sign-in">
            Começar
            <ArrowRight className="h-[18px] w-[18px] ml-2" />
          </Link>
        </Button>
      )}

      <Button
        variant="outline"
        asChild
        className="h-9 font-semibold bg-secondary-foreground/95 text-background hover:text-background hover:bg-secondary-foreground/85"
      >
        <Link href="https://github.com/duardodev/habituate-web" target="_blank">
          <Github className="h-[18px] w-[18px] mr-2" />
          GitHub
        </Link>
      </Button>
    </motion.div>
  );
}
