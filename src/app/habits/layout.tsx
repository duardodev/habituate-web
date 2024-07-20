import { Header } from './components/header';
import { ReactNode } from 'react';

export default function HabitsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="h-full w-full max-w-[860px] px-4 mx-auto">{children}</main>
    </>
  );
}
