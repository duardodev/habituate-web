import { useEffect, useState } from 'react';

export function useLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 60);

    return () => clearTimeout(timeout);
  });

  return {
    isLoading,
  };
}
