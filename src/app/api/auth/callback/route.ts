import { api } from '@/functions/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const registerResponse = await api('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const { token } = await registerResponse.json();

  const redirectUrl = new URL('/', request.url);

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30; // 30 Days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  });
}
