export function getCdnBase(): string | undefined {
  const base = process.env.NEXT_PUBLIC_CDN_BASE;
  if (!base) return undefined;
  try {
    // Ensure it is a valid URL and trim trailing slash
    const url = new URL(base);
    return url.origin + (url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname);
  } catch {
    return undefined;
  }
}

export function withCdn(src: string): string {
  if (!src) return src;
  // If already absolute URL, return as-is
  if (/^https?:\/\//i.test(src)) return src;
  const base = getCdnBase();
  if (!base) return src;
  // Ensure single slash between base and path
  return `${base}${src.startsWith('/') ? '' : '/'}${src}`;
}


