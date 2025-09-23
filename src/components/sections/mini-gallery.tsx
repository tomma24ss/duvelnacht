import Image from 'next/image';
import { getGallery } from '@/lib/gallery';

export function MiniGallery() {
  const shuffled = [...getGallery()].sort(() => Math.random() - 0.5);
  return (
    <section id="gallery" className="py-0 md:py-0">
      <div className="w-full">
        <div className="columns-2 md:columns-4 [column-gap:0] [column-fill:_balance]">
          {shuffled.map((item) => {
            const isVideo = item.type === 'video';
            return (
              <div
                key={item.id}
                className="break-inside-avoid mb-0"
              >
                {isVideo ? (
                  <video
                    src={item.src}
                    className="w-full h-auto align-top block"
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="w-full h-auto object-cover align-top block"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


