import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserProfileInfo } from '@/components/user-profile-info';
import { currentUser } from '@clerk/nextjs/server';

const Logo = dynamic(() => import('../../../../components/logo').then(mod => mod.Logo), {
  ssr: false,
});

export async function Header() {
  const user = await currentUser();

  return (
    <header className="max-w-[860px] w-full px-4 pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          {user && <UserProfileInfo />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
