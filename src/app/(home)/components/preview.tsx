'use client';

import Image from 'next/image';
import previewDark from '../../../../public/preview-dark.png';
import previewLight from '../../../../public/preview-light.png';
import { useTheme } from 'next-themes';

export function Preview() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="max-w-4xl">
      <Image
        src={previewLight}
        quality={100}
        width={896}
        height={558.16}
        alt="Light theme preview"
        className={`border border-border shadow-2xl rounded-2xl transition-opacity duration-300 ${
          resolvedTheme === 'dark' ? 'opacity-0 hidden' : 'opacity-100'
        }`}
      />
      <Image
        src={previewDark}
        quality={100}
        alt="Dark theme preview"
        className={`border border-border shadow-2xl dark:shadow-none rounded-2xl transition-opacity duration-300 ${
          resolvedTheme === 'light' ? 'opacity-0 hidden' : 'opacity-100'
        }`}
      />
    </div>
  );
}
