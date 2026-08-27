import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Stable pseudo-random order across builds (same seed → same order). */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  for (let i = result.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) | 0;
    const j = (hash >>> 0) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
