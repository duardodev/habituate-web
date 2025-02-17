import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs/server';
import { Description } from './components/description';
import { Heading } from './components/heading';
import { Buttons } from './components/buttons';

const Preview = dynamic(() => import('./components/preview').then(mod => mod.Preview), {
  ssr: false,
});

export default function HomePage() {
  const { userId } = auth();

  return (
    <div className="flex items-center flex-col gap-20">
      <div className="space-y-5">
        <Heading />
        <Description />
        <Buttons userId={userId} />
      </div>

      <Preview />
    </div>
  );
}
