import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';

export function Buttons() {
  const { userId } = auth();

  return (
    <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
      <Button className="h-9 border-none font-semibold" asChild>
        <Link href={userId ? '/management' : '/auth/sign-in'}>Get Started</Link>
      </Button>

      <Button
        variant="outline"
        asChild
        className="h-9 font-semibold bg-secondary-foreground/95 text-background hover:text-background hover:bg-secondary-foreground/85"
      >
        <Link href="https://github.com/duardodev/habituate-web" target="_blank">
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Link>
      </Button>
    </div>
  );
}
