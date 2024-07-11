import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';
import { Footer } from '@/components/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Habituate - Monitore seus hábitos com facilidade.',
  description: 'Uma ferramenta que ajuda você a monitorar seus hábitos de forma simples e objetiva.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen antialiased dark`}>
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
