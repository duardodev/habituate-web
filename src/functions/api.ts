import { env } from '@/env';

export function api(path: string | URL, init?: RequestInit) {
  const url = new URL(path, env.NEXT_PUBLIC_API_BASE_URL);

  return fetch(url, init);
}
