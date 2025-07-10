import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="h-[10vh] px-6 py-9 mx-auto mt-auto">
      <p className="text-sm text-center text-foreground/70">
        © {year},{' '}
        <Link
          href="https://duardodev.vercel.app/en"
          target="_blank"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          Deivit Eduardo.
        </Link>
      </p>
    </footer>
  );
}
