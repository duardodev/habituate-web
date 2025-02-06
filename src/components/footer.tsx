import Link from 'next/link';

export function Footer() {
  return (
    <footer className="h-[10vh] px-6 py-9 mx-auto mt-auto">
      <p className="text-sm text-center text-foreground/70">
        © Built by{' '}
        <Link href="https://duardodev.vercel.app/en" target="_blank" className="underline">
          duardodev.
        </Link>
      </p>
    </footer>
  );
}
