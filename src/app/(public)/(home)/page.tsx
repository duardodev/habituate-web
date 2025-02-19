import dynamic from 'next/dynamic';
import { Buttons } from './components/buttons';

const Preview = dynamic(() => import('./components/preview').then(mod => mod.Preview), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="flex items-center flex-col gap-20">
      <div className="space-y-5">
        <h1 className="text-foreground/95 text-4xl md:text-[40px] md:leading-[46px] font-bold text-center">
          Master Your Habits, <br /> Transform Your Life
        </h1>

        <p className="max-w-[650px] text-secondary-foreground/95 text-center text-lg md:text-xl">
          Habituate helps you build, manage, and maintain positive habits. Start your journey to a better you today!
        </p>

        <Buttons />
      </div>

      <Preview />
    </div>
  );
}
