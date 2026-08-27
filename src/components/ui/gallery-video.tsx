'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GalleryVideoProps {
  src: string;
  className?: string;
}

export function GalleryVideo({ src, className }: GalleryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={cn('w-full h-auto align-top block', className)}
      muted
      playsInline
      loop
      preload="none"
    />
  );
}
