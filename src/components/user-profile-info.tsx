import Link from 'next/link';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { SignOutButton } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarImage } from './ui/avatar';

export async function UserProfileInfo() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="order-first min-[450px]:order-last relative h-10 w-10 select-none rounded-full bg-muted"
          aria-label="Foto de perfil"
        >
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt="Foto de perfil" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {
                user?.emailAddresses.find(email => email.id === user.primaryEmailAddressId)
                  ?.emailAddress
              }
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
    </DropdownMenu>
  );
}
