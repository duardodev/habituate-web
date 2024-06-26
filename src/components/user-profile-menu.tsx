'use client';

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from './ui/dropdown-menu';
import { signOut } from 'next-auth/react';

interface UserProfileMenuProps {
  name?: string | null;
  email?: string | null;
}

export function UserProfileMenu({ name, email }: UserProfileMenuProps) {
  return (
    <DropdownMenuContent className="w-56" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut()}>
        Sair
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
