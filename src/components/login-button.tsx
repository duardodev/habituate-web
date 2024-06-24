'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Github } from 'lucide-react';

export function LoginButton() {
  return (
    <Button variant="outline" onClick={() => signIn('github')}>
      <Github className="h-[18px] w-[18px] mr-2" />
      Login com GitHub
    </Button>
  );
}
