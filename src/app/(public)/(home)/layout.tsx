import { ReactNode } from 'react';
import { Header } from './components/header';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-32 h-full flex flex-1 items-center justify-center px-4 mx-auto">
        <div className="w-60 h-60 -ml-[120px] fixed top-1/2 left-1/2 bg-primary opacity-35 blur-[80px] -z-10" />
        {children}
      </main>
    </>
  );
}
