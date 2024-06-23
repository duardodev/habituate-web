import GitHubProvider from 'next-auth/providers/github';
import { AuthOptions } from 'next-auth';
import { env } from '@/env';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};
