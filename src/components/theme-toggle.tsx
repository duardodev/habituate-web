'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  floating?: boolean;
}

export function ThemeToggle({ floating }: ModeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn('w-8 h-8', floating && 'w-9 h-9 rounded-3xl fixed bottom-10 right-8 z-40')}
        >
          <Sun
            className={cn(
              'h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
              floating && 'h-[1.2rem] w-[1.2rem]'
            )}
          />
          <Moon
            className={cn(
              'absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
              floating && 'h-[1.2rem] w-[1.2rem]'
            )}
          />
          <span className="sr-only">Switch theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
