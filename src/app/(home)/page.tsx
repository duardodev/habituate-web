import { auth } from '@clerk/nextjs/server';
import { Description } from './components/description';
import { Heading } from './components/heading';
import { Buttons } from './components/buttons';

export default function HomePage() {
  const { userId } = auth();

  return (
    <div className="flex flex-col items-center gap-5">
      <Heading />
      <Description />
      <Buttons userId={userId} />
    </div>
  );
}
