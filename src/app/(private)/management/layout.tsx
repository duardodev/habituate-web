import { ReactNode } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Header } from './components/header';

export default function ManagementLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <ThemeToggle floating={true} />
      <main className="h-full w-full px-4 overflow-x-hidden">{children}</main>
    </>
  );
}
