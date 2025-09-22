'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollSpy, useScrollPastHero, useScrollToSection } from '@/hooks/useScrollSpy';
import { getSiteData } from '@/lib/data';
import { cn } from '@/lib/utils';

const navigationItems = [
  { id: 'hero', label: 'Home' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'sponsors', label: 'Sponsors' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const siteData = getSiteData();
  const hasScrolled = useScrollPastHero();
  const activeSection = useScrollSpy(navigationItems.map(item => item.id));
  const scrollToSection = useScrollToSection();

  // Close mobile menu when clicking outside or on navigation item
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          hasScrolled 
            ? "glass-effect shadow-lg" 
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('hero')}
            className="font-display font-bold text-xl md:text-2xl text-glow focus-glow"
          >
            DVLN
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => handleNavClick('gallery')}
              className={cn(
                "text-sm font-medium transition-colors focus-glow",
                activeSection === 'gallery'
                  ? "text-amber-400 text-amber-glow"
                  : "text-off-white hover:text-amber-400"
              )}
            >
              Gallery
            </motion.button>
          </div>

          {/* Contact CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => window.open('mailto:info@duvelnacht.com', '_blank')}
              className="btn-ember font-semibold focus-glow"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-off-white hover:text-amber-400 focus-glow"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-0 right-0 bottom-0 z-40 w-80 max-w-[85vw] glass-effect border-l border-white/10 md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-2xl text-glow">
                  DUVELNACHT
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-off-white hover:text-amber-400"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="flex flex-col space-y-4 flex-1">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "text-left py-3 px-4 rounded-lg text-lg font-medium transition-all",
                      activeSection === item.id
                        ? "text-amber-400 bg-amber-400/10 text-amber-glow"
                        : "text-off-white hover:text-amber-400 hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-8">
                <Button
                  onClick={() => window.open('mailto:info@duvelnacht.com', '_blank')}
                  className="w-full btn-ember font-semibold text-lg py-3"
                >
                  Contact
                </Button>
              </div>

              {/* Mobile Contact Info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-white/60 mb-2">
                  {siteData.date} • {siteData.venue}
                </p>
                <p className="text-sm text-white/60">
                  {siteData.city}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
