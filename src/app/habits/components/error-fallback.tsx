interface ErrorFallbackProps {
  message: string;
}

export function ErrorFallback({ message }: ErrorFallbackProps) {
  return (
    <div className="mt-4 flex items-center justify-center">
      <p className="w-80 md:w-full text-sm  text-center">{message}</p>
    </div>
  );
}
