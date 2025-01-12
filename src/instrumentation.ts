import { env } from './env';

export async function register() {
  console.log('Running the instrumentation hook');

  if (env.NEXT_PUBLIC_MODE === 'test' && process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Running in test mode, setting up MSW server');

    const { server } = await import('./app/api/mocks/server');
    server.listen();
  } else {
    console.log('Skipping MSW setup for ', process.env.NEXT_RUNTIME);
  }
}
