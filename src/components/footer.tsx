import Link from 'next/link';
import dayjs from 'dayjs';

export function Footer() {
  const currentYear = dayjs().year();

  return (
    <footer className="h-12 px-6 py-12 mx-auto mt-auto">
      <p className="text-sm text-center text-foreground/70">
        © {currentYear} Habituate. <br className="min-[340px]:hidden" /> Feito por{' '}
        <Link href="https://github.com/duardodev" target="_blank" className="underline">
          Deivit Eduardo.
        </Link>
      </p>
    </footer>
  );
}
