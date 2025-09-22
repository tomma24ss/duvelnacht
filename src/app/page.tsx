import { HeroSection } from '@/components/sections/hero';
import { MinimalTickets } from '@/components/sections/tickets';
import { MiniGallery } from '@/components/sections/mini-gallery';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MinimalTickets />
      <MiniGallery />
      <Footer />
    </main>
  );
}