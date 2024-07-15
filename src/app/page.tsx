import Link from 'next/link';
import { Calendar } from '@/components/calendar';
import { Habits } from '@/components/habits';
import { Background } from '@/components/ui/background';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { cookies } from 'next/headers';

export default function Home() {
  const isAuthenticated = Boolean(cookies().get('token'));

  return (
    <>
      {isAuthenticated ? (
        <main className="w-full max-w-[860px] px-4 mx-auto">
          <div className="flex flex-col overflow-x-auto">
            <Calendar />
            <Habits />
          </div>
        </main>
      ) : (
        <>
          <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <Background />
          </div>
          <main className="w-full overflow-hidden relative p-4 mx-auto flex flex-1 items-center justify-center flex-col gap-3">
            <div className="relative">
              <h1 className="text-4xl font-bold">Habituate</h1>
              <span className="absolute -right-4 bottom-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </div>
            <p className="max-w-80 text-foreground/80 text-center">Uma solução ágil e minimalista para o monitoramento dos seus hábitos.</p>
            <Button variant="outline" asChild className="mt-2">
              <Link
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=read:user%20user:email`}
              >
                <Github className="h-[18px] w-[18px] mr-2" />
                Entrar com GitHub
              </Link>
            </Button>
          </main>
        </>
      )}
    </>
  );
}
