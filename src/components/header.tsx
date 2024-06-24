import { getServerSession } from 'next-auth';
import { AddHabitDialog } from './add-habit-dialog';
import { LoginButton } from './login-button';
import { Separator } from './ui/separator';
import { authOptions } from '@/lib/auth';

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="max-w-[820px] px-6 pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          habituate <span className="text-green-400 text-[28px]">.</span>
        </h1>
        {session ? <AddHabitDialog /> : <LoginButton />}
      </div>

      <Separator className="mt-6" />
    </header>
  );
}
