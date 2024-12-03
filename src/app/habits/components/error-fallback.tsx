interface ErrorFallbackProps {
  message: string;
}

export function ErrorFallback({ message }: ErrorFallbackProps) {
  return (
    <div className="h-32 flex items-center justify-center">
      <p className="text-center">{message}</p>
    </div>
  );
}
