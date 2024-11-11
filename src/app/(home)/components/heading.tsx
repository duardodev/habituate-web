'use client';

import { motion } from 'framer-motion';

export function Heading() {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      viewport={{
        once: true,
      }}
      className="text-foreground/95 text-4xl md:text-[40px] md:leading-[46px] font-bold text-center"
    >
      Domine Seus Hábitos, <br /> Transforme Sua Vida
    </motion.h1>
  );
}
