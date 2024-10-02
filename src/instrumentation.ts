export async function register() {
  console.log('Running the instrumentation hook');

  if (process.env.NODE_ENV === 'development' && process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Running in development mode, setting up MSW server');

    const { server } = await import('./app/api/mocks/server');
    server.listen();
  } else {
    console.log('Skipping MSW setup for ', process.env.NEXT_RUNTIME);
  }
}
