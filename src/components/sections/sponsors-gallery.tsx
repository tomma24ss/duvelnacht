import Image from 'next/image';
import { getSponsorImages } from '@/lib/gallery';

export function SponsorsGallery() {
  const items = getSponsorImages();
  if (items.length === 0) return null;

  return (
    <section id="sponsors" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-center text-glow">
          Onze sponsors
        </h2>
        <p className="text-center text-off-white/70 mb-6">Bedankt aan onze partners</p>
        <div className="columns-2 md:columns-4 [column-gap:0] [column-fill:_balance]">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-0 p-4 flex items-center justify-center bg-white/5">
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={400}
                className="w-full h-auto object-contain align-top block max-h-40"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


