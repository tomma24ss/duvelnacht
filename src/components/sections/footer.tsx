'use client';

import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const links = {
    facebook: 'https://www.facebook.com/duvelnacht',
    instagram: 'https://www.instagram.com/duvelnacht_chirobalegem/',
  };

  return (
    <footer className="w-full border-t border-white/10 bg-charcoal-900/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-off-white/80 hover:text-amber-400 transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-off-white/80 hover:text-amber-400 transition-colors"
          >
            <Facebook className="h-6 w-6" />
          </a>
        </div>
        <p className="text-xs text-off-white/60">© {new Date().getFullYear()} Duvelnacht</p>
      </div>
    </footer>
  );
}


