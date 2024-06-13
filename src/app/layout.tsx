import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/lib/react-query';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Habituate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased dark`}>
        <ReactQueryClientProvider>
          <Header />
          {children}
        </ReactQueryClientProvider>
        <Toaster position="top-center" richColors className="font-medium" />
      </body>
    </html>
  );
}
