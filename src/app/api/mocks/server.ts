import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { env } from '@/env';

export const server = setupServer(...handlers);

export function enableMSW() {
  if (env.NEXT_PUBLIC_MODE !== 'test') {
    return;
  }

  server.listen();
}
