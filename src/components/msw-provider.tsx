'use client';

import { Suspense, use } from 'react';

const mockingEnabledPromise =
  typeof window !== 'undefined' && process.env.NODE_ENV === 'test'
    ? import('../app/api/mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: 'bypass',

          quiet: false,
          waitUntilReady: true,
        });
      })
    : Promise.resolve();

export function MSWProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  use(mockingEnabledPromise);
  return children;
}
