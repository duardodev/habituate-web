import Link from 'next/link';
import dynamic from 'next/dynamic';
import { currentUser } from '@clerk/nextjs/server';
import { AddHabitDialog } from './add-habit-dialog';
import { UserProfileMenu } from './user-profile-menu';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Logo = dynamic(() => import('../../../components/logo').then(mod => mod.Logo), {
  ssr: false,
});

export async function Header() {
  const user = await currentUser();

  return (
    <header className="max-w-[860px] w-full px-4 pt-6 mx-auto">
      <div className="flex items-center">
        <Link href="/">
          <Logo />
        </Link>

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
                  <AvatarImage src={user?.imageUrl} alt="Foto de perfil" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <UserProfileMenu user={user} />
          </DropdownMenu>
        </div>
      </div>
      <Separator className="mt-6" />
    </header>
  );
}
