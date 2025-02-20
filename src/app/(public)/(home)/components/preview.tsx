'use client';

import Image from 'next/image';
import previewDark from '../../../../../public/preview-dark.png';
import previewLight from '../../../../../public/preview-light.png';
import { useTheme } from 'next-themes';

export function Preview() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="max-w-[650px]">
      <Image
        src={previewLight}
        quality={100}
        width={650}
        height={402}
        alt="Light theme preview"
        className={`max-h-[402px] border border-border shadow-2xl rounded-2xl transition-opacity duration-300 ${
          resolvedTheme === 'dark' ? 'opacity-0 hidden' : 'opacity-100'
        }`}
      />
      <Image
        src={previewDark}
        quality={100}
        width={650}
        height={402}
        alt="Dark theme preview"
        className={`max-h-[402px] border border-border shadow-2xl dark:shadow-none rounded-2xl transition-opacity duration-300 ${
          resolvedTheme === 'light' ? 'opacity-0 hidden' : 'opacity-100'
        }`}
      />
    </div>
  );
}
