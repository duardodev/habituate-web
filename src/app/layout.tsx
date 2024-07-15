import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';
import { Footer } from '@/components/footer';
import './globals.css';

import { GeistSans } from 'geist/font/sans';
import { cn } from '@/lib/utils';

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
// });

export const metadata: Metadata = {
  metadataBase: new URL('https://habituate-duardodev.vercel.app'),
  title: 'Habituate - Monitore seus hábitos com simplicidade.',
  description: 'Uma ferramenta que ajuda você a monitorar seus hábitos de forma simples e objetiva.',
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
    <html lang="pt-BR" className="h-full">
      <body className={cn('flex flex-col min-h-screen antialiased dark', GeistSans.className)}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Toaster position="top-center" richColors className="font-medium" />
      </body>
    </html>
  );
}
