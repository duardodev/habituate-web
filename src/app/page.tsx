import Link from 'next/link';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Background } from '@/components/ui/background';
import { Button } from '@/components/ui/button';
import { Github, LogIn } from 'lucide-react';

export default function Home() {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <Background />
      </div>

      <main className="mx-auto flex flex-1 items-center justify-center flex-col gap-3 px-4">
        <div className="relative">
          <h1 className="text-4xl font-bold">Habituate</h1>
          <span className="absolute -right-4 bottom-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        </div>

        <p className="max-w-80 text-foreground/80 text-center">Uma solução ágil e minimalista para o monitoramento dos seus hábitos.</p>

        <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
          <SignedOut>
            <ClerkLoading>
              <Button disabled className="bg-foreground hover:bg-foreground/80 h-9 border-none text-background font-semibold">
                Entrar
                <LogIn className="h-[18px] w-[18px] ml-2" />
              </Button>
            </ClerkLoading>
          </SignedOut>

          <ClerkLoaded>
            <SignedOut>
              <SignInButton>
                <Button className="bg-foreground hover:bg-foreground/80 h-9 border-none text-background font-semibold">
                  Entrar
                  <LogIn className="h-[18px] w-[18px] ml-2" />
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>

          <SignedIn>
            <Button className="bg-foreground hover:bg-foreground/80 h-9 border-none text-background font-semibold" asChild>
              <Link href="/habits">
                Entrar
                <LogIn className="h-[18px] w-[18px] ml-2" />
              </Link>
            </Button>
          </SignedIn>

          <Button variant="outline" className="h-[38px] bg-transparent" asChild>
            <Link href="https://github.com/duardodev/habituate-web" target="_blank">
              <Github className="h-[16px] w-[16px] mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
