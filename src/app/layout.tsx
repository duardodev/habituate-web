import type { Metadata } from 'next';
import { Providers } from './providers';
import { GeistSans } from 'geist/font/sans';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/footer';
import { dark } from '@clerk/themes';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './globals.css';

dayjs.extend(utc);

export const metadata: Metadata = {
  metadataBase: new URL('https://habituate-duardodev.vercel.app'),
  title: 'Habituate | Domine seus hábitos, transforme sua vida.',
  description: 'Habituate ajuda você construir, gerenciar, e manter hábitos positivos. Comece sua jornada para um melhor hoje.',
  keywords: 'habituate, hábitos, monitoramento de hábitos, gerenciamento, produtividade, bons hábitos, desenvolvimento pessoal',
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
        <body className={cn('antialiased', GeistSans.className)}>
          <Providers>
            <div className="min-h-screen flex-1">{children}</div>
            <Footer />
          </Providers>
          <Toaster position="top-center" richColors className="font-medium" />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
