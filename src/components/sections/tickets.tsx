'use client';

import { getSiteData } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function MinimalTickets() {
  const site = getSiteData();
  return (
    <section id="tickets" className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-glow">
          Tickets
        </h2>
        <p className="text-off-white/70 mb-8">Beperkte capaciteit. Reserveer je plek.</p>
        <a href={site.ticketURL} target="_blank" rel="noopener noreferrer">
          <Button className="btn-ember text-lg px-10 py-5 font-semibold">
            Koop Tickets
          </Button>
        </a>
      </div>
    </section>
  );
}


