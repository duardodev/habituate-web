'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';

export function Logo() {
  const { resolvedTheme } = useTheme();

  return (
    <Link href="/" aria-label="Go to home page">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 160 161">
          <rect width="160" height="160.476" fill={resolvedTheme === 'light' ? '#09090B' : '#FFFEFC'} rx="32"></rect>
          <path
            fill={resolvedTheme === 'light' ? '#FFFEFC' : '#09090B'}
            d="M28.906 64.35c-6.547 6.57-6.54 17.23.015 23.81l42.986 43.139c6.556 6.579 17.177 6.586 23.724.016s6.54-17.23-.016-23.809l-8.902-8.935a5.44 5.44 0 0 0-7.71-.005 5.487 5.487 0 0 0 .005 7.739l9.05 9.083a5.696 5.696 0 0 1 .006 8.035 5.65 5.65 0 0 1-8.007-.005L36.774 79.98a5.696 5.696 0 0 1-.005-8.035 5.647 5.647 0 0 1 8.007.005l12.887 12.933c6.948 6.973 18.145 7.079 25.204.311l2.867-2.871a5.857 5.857 0 0 1 8.304.005l13.332 13.38c6.556 6.58 17.177 6.587 23.724.017 6.547-6.571 6.54-17.23-.015-23.81l-42.986-43.14c-6.556-6.579-18.017-5.743-24.564.827-6.546 6.57-5.7 16.388.855 22.967l8.903 8.934a5.44 5.44 0 0 0 7.71.005 5.485 5.485 0 0 0-.005-7.738l-9.05-9.083a5.696 5.696 0 0 1-.006-8.035 5.647 5.647 0 0 1 8.007.005l43.282 43.438a5.696 5.696 0 0 1 .006 8.035 5.65 5.65 0 0 1-8.007-.005l-12.887-12.933-.004.003c-6.967-6.68-17.945-6.687-24.903-.017l-.004-.003-2.864 2.874a5.856 5.856 0 0 1-8.303-.005L52.63 64.366c-6.555-6.58-17.176-6.586-23.723-.016"
          ></path>
        </svg>

        <h1 className="hidden min-[428px]:block text-xl font-semibold">Habituate</h1>
      </div>
    </Link>
  );
}
