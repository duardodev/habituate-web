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
        <Button
          className="order-last relative h-9 w-9 select-none rounded-full bg-transparent"
          aria-label="Profile photo"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.imageUrl} alt="Profile photo" />
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
