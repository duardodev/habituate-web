'use client';

import { Suspense, use } from 'react';

const mockingEnabledPromise =
  typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MODE === 'test'
    ? import('../app/api/mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: 'bypass',
          quiet: false,
          waitUntilReady: true,
        });
      })
    : Promise.resolve();

export function MSWProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({ children }: { children: React.ReactNode }) {
  use(mockingEnabledPromise);
  return children;
}
