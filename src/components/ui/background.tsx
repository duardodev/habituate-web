export function Background() {
  return (
    <svg
      className="absolute pointer-events-none inset-0 h-full w-full stroke-gray-200 opacity-10 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
      aria-hidden
    >
      <defs>
        <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
    </svg>
  );
}
