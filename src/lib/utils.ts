import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cacheTag(tag: string, userId: string | null) {
  return `${tag}/${userId}`;
}
