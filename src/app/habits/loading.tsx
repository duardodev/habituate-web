'use client';

import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="w-6 h-6 animate-spin" />
    </div>
  );
}
