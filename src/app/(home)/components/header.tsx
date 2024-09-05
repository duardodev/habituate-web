import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ThemeToggle } from '@/components/theme-toggle';

const Logo = dynamic(() => import('../../../components/logo').then(mod => mod.Logo), {
  ssr: false,
});

export function Header() {
  return (
    <header className="max-w-[1024px] w-full px-4 pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
