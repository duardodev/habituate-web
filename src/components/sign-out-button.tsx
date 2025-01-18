'use client';

import { useClerk } from '@clerk/nextjs';
import { DropdownMenuItem, DropdownMenuShortcut } from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <DropdownMenuItem
      className="w-full cursor-pointer"
      onClick={() => signOut({ redirectUrl: '/' })}
      autoFocus={true}
      onKeyDown={e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
          signOut({ redirectUrl: '/' });
        }
      }}
      aria-label="Sair. Use Ctrl ou ⌘ + Q para sair rapidamente."
    >
      <LogOut className="mr-2 w-4 h-4" />
      Sair
      <DropdownMenuShortcut className="ml-auto">Ctrl ou ⌘ + Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
