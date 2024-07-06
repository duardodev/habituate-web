import Link from 'next/link';
import { AddHabitDialog } from './add-habit-dialog';
import { UserProfileMenu } from './user-profile-menu';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Github } from 'lucide-react';
import { getUser } from '@/lib/auth';

export async function Header() {
  const user = getUser();

  return (
    <header className="max-w-[860px] w-full px-6 pt-6 mx-auto">
      <div className="flex items-center">
        <h1 className="text-lg font-medium">
          habituate <span className="text-green-400 text-[28px]">.</span>
        </h1>

        {user ? (
          <div className="ml-auto flex items-center gap-6">
            <AddHabitDialog />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 select-none rounded-full bg-muted">
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt="" />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <UserProfileMenu name={user.name} email={user.email} />
            </DropdownMenu>
          </div>
        ) : (
          <Button variant="outline" asChild className="ml-auto">
            <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}>
              <Github className="h-[18px] w-[18px] mr-2" />
              Login com GitHub
            </Link>
          </Button>
        )}
      </div>

      <Separator className="mt-6" />
    </header>
  );
}
