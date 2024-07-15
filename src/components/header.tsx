import Link from 'next/link';
import Image from 'next/image';
import { AddHabitDialog } from './add-habit-dialog';
import { UserProfileMenu } from './user-profile-menu';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Github } from 'lucide-react';
import { getUser } from '@/lib/auth';

import logo from '../../public/logo.svg';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';

export async function Header() {
  const user = getUser();
  const isAuthenticated = Boolean(cookies().get('token'));

  if (!isAuthenticated) {
    return;
  }

  return (
    <header className="max-w-[860px] w-full px-4 pt-6 mx-auto">
      <div className="flex items-center">
        <Image src={logo} alt="Logo do Habituate" className="hidden min-[450px]:block" priority />
        <div className="w-full min-[450px]:w-auto min-[450px]:ml-auto flex items-center justify-between min-[450px]:justify-normal gap-6">
          <AddHabitDialog />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="order-first min-[450px]:order-last relative h-10 w-10 select-none rounded-full bg-muted"
                aria-label="Foto de perfil"
              >
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt="Foto de perfil" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <UserProfileMenu name={user?.name} email={user?.email} />
          </DropdownMenu>
        </div>
      </div>
      <Separator className="mt-6" />
    </header>
  );
}
