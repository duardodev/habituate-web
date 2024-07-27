import { clerkSetup } from '@clerk/testing/cypress';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({
        config,
        options: {
          frontendApiUrl: 'http://localhost:3000',
          publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        },
      });
    },
    baseUrl: 'http://localhost:3000',
  },
});
