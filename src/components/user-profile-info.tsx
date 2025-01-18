import { currentUser } from '@clerk/nextjs/server';
import { SignOutButton } from '@/components/sign-out-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export async function UserProfileInfo() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="order-last relative h-8 w-8 select-none rounded-full bg-muted" aria-label="Foto de perfil">
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt="Foto de perfil" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user?.fullName || user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
