import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';

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
      <DropdownMenuItem asChild>
        <a href="/api/auth/logout">
          <LogOut className="mr-2 w-4 h-4" />
          Sair
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
