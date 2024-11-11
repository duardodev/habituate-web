import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AddHabitDialog } from './add-habit-dialog';
import { Separator } from '@/components/ui/separator';
import { UserProfileInfo } from '@/components/user-profile-info';

const Logo = dynamic(() => import('../../../components/logo').then(mod => mod.Logo), {
  ssr: false,
});

export async function Header() {
  return (
    <header className="max-w-[860px] w-full px-4 pt-8 mx-auto">
      <div className="flex items-center">
        <Link href="/">
          <Logo />
        </Link>

        <div className="w-full min-[450px]:w-auto min-[450px]:ml-auto flex items-center justify-between min-[450px]:justify-normal gap-6">
          <AddHabitDialog />
          <UserProfileInfo />
        </div>
      </div>

      <Separator className="mt-6" />
    </header>
  );
}
