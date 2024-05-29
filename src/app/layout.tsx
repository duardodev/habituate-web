import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Header } from '@/components/header';
import './globals.css';

const inter = Poppins({
  subsets: ['latin'],
  weight: '500',
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
        <Header />
        {children}
      </body>
    </html>
  );
}
