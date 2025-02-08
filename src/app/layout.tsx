import type { Metadata } from 'next';
import { Providers } from './providers';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://habituate-duardodev.vercel.app'),
  title: 'Habituate | Master your habits, transform your life.',
  description:
    'Habituate helps you build, manage, and maintain positive habits. Start your journey to a better you today!',
  keywords: 'habituate, habits, habit monitoring, management, productivity, good habits, personal development, tasks',
  authors: [
    {
      name: 'Deivit Eduardo',
      url: 'https://github.com/duardodev',
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: '6yibl8UOF5YJw9N5OtjVH5JWoqkkzkpKD9HDlU4lHOY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={cn('antialiased', GeistSans.className)}>
        <Providers>
          <div className="min-h-[90vh] flex-1">{children}</div>
          <Footer />
          <Toaster position="top-center" richColors className="font-medium" />
        </Providers>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
    </html>
  );
}
