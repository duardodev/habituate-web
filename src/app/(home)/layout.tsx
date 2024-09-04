import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-[88vh] flex flex-1 items-center justify-center px-4 mx-auto">
      <div className="w-56 h-56 -mt-[112px] -ml-[112px] absolute top-1/2 left-1/2 bg-primary opacity-30 blur-[80px] -z-10" />
      {children}
    </main>
  );
}
