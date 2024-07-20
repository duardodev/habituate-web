import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

interface UserProfileMenuProps {
  user: User | null;
}

export function UserProfileMenu({ user }: UserProfileMenuProps) {
  return (
    <DropdownMenuContent className="w-56" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium leading-none">{user?.fullName}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress}
          </p>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem asChild className="w-full">
        <SignOutButton>
          <Link href="/">
            <LogOut className="mr-2 w-4 h-4" />
            Sair
            <DropdownMenuShortcut className="ml-auto">⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </SignOutButton>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
