import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';
import { Footer } from '@/components/footer';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/lib/utils';
import { dark } from '@clerk/themes';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://habituate-duardodev.vercel.app'),
  title: 'Habituate - Monitore seus hábitos com simplicidade.',
  description:
    'Uma ferramenta que ajuda você a monitorar seus hábitos de forma simples e objetiva.',
  keywords: 'habituate, hábitos, monitoramento de hábitos, produtividade',
  authors: [
    {
      name: 'duardodev',
      url: 'https://github.com/duardodev',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="pt-BR" className="h-full">
        <body className={cn('antialiased dark', GeistSans.className)}>
          <Providers>{children}</Providers>
          <Footer />
          <Toaster position="top-center" richColors className="font-medium" />
        </body>
      </html>
    </ClerkProvider>
  );
}
