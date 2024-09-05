import { ReactNode } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Header } from './components/header';

export default function HabitsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <ThemeToggle floating={true} />
      <main className="h-full w-full max-w-[860px] px-4 mx-auto">{children}</main>
    </div>
  );
}
