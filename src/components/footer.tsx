import Link from 'next/link';
import dayjs from 'dayjs';

export function Footer() {
  const currentYear = dayjs().year();

  return (
    <footer className="max-w-[800px] h-12 px-6 pb-12 pt-20 mx-auto mt-auto">
      <p className="text-sm text-foreground/70">
        {currentYear} © Habituate. Feito por{' '}
        <Link href="https://github.com/duardodev" target="_blank" className="underline">
          Deivit Eduardo.
        </Link>
      </p>
    </footer>
  );
}
