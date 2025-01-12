'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { MSWProvider } from '@/components/msw-provider';
import { ClerkProvider } from '@clerk/nextjs';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchInterval: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ClerkProvider>
        <MSWProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </MSWProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
