import Image from 'next/image';
import { getGallery } from '@/lib/gallery';
import { seededShuffle } from '@/lib/utils';
import { GalleryVideo } from '@/components/ui/gallery-video';

const POSTER_ID = 'affiche-duvelnacht';

export function MiniGallery() {
  const gallery = getGallery();
  const poster = gallery.find((item) => item.id === POSTER_ID);
  const items = seededShuffle(
    gallery.filter((item) => item.id !== POSTER_ID),
    'duvelnacht-gallery',
  );
  return (
    <section id="gallery" className="py-0 md:py-0">
      <div className="w-full">
        <div className="columns-2 md:columns-4 [column-gap:0] [column-fill:_balance]">
          {poster ? (
            <div key={poster.id} className="break-inside-avoid mb-0">
              <Image
                src={poster.src}
                alt="Duvelnacht affiche"
                width={733}
                height={1024}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="w-full h-auto object-cover align-top block"
                priority
              />
            </div>
          ) : null}
          {items.map((item) => {
            const isVideo = item.type === 'video';
            return (
              <div
                key={item.id}
                className="break-inside-avoid mb-0"
              >
                {isVideo ? (
                  <GalleryVideo src={item.src} />
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
