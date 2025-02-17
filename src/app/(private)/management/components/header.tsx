import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AddHabitDialog } from './add-habit-dialog';
import { UserProfileInfo } from '@/components/user-profile-info';

const Logo = dynamic(() => import('../../../../components/logo').then(mod => mod.Logo), {
  ssr: false,
});

export async function Header() {
  return (
    <header className="max-w-[860px] w-full px-4 pt-8 mx-auto">
      <div className="flex items-center">
        <Link href="/">
          <Logo />
        </Link>

        <div className="w-auto ml-auto flex items-center gap-6">
          <AddHabitDialog />
          <UserProfileInfo />
        </div>
      </div>
    </header>
  );
}
