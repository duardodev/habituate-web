import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';

export default function HomePage() {
  const { userId } = auth();

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-4xl md:text-[42px] md:leading-[46px] font-bold text-center">
        Domine Seus Hábitos, <br /> Transforme Sua Vida
      </h1>

      <p className="max-w-[640px] text-foreground/95 text-center text-lg md:text-xl">
        Habituate ajuda você construir, gerenciar, e manter hábitos positivos. Comece sua jornada
        para um você melhor hoje.
      </p>

      <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
        {userId ? (
          <Button className="h-9 border-none font-semibold" asChild>
            <Link href="/habits">
              Começar
              <ArrowRight className="h-[18px] w-[18px] ml-2" />
            </Link>
          </Button>
        ) : (
          <Button className="h-9 border-none font-semibold" asChild>
            <Link href="/auth/sign-in">
              Começar
              <ArrowRight className="h-[18px] w-[18px] ml-2" />
            </Link>
          </Button>
        )}

        <Button
          variant="outline"
          asChild
          className="h-9 font-semibold bg-secondary-foreground text-black hover:text-black hover:bg-secondary-foreground/90"
        >
          <Link href="https://github.com/duardodev/habituate-web" target="_blank">
            <Github className="h-[18px] w-[18px] mr-2" />
            Meu GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
}
