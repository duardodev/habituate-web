import { getServerSession } from 'next-auth';
import { AddHabitDialog } from './add-habit-dialog';
import { LoginButton } from './login-button';
import { UserProfileMenu } from './user-profile-menu';

import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { authOptions } from '@/lib/auth';

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="max-w-[820px] px-6 pt-6 mx-auto">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">
          habituate <span className="text-green-400 text-[28px]">.</span>
        </h1>

        {session ? (
          <div className="ml-auto flex items-center gap-6">
            <AddHabitDialog />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 select-none rounded-full bg-muted">
                  <Avatar>
                    <AvatarImage src={session.user?.image ?? ''} alt="" />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <UserProfileMenu name={session.user?.name} email={session.user?.email} />
            </DropdownMenu>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>

      <Separator className="mt-6" />
    </header>
  );
}
