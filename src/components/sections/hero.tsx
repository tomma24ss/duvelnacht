'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSiteData } from '@/lib/data';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const siteData = getSiteData();

  useEffect(() => {
    const img = new Image();
    img.src = siteData.heroPoster;
    img.onload = () => setIsLoaded(true);
  }, [siteData.heroPoster]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static Background Image */}
      <div 
        className={cn(
          "absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundImage: `url(${siteData.heroPoster})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Centered Headline Layer */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-center text-6xl md:text-8xl lg:text-9xl tracking-widest text-off-white animate-pulse-glow"
          style={{
            textShadow: '0 0 30px rgba(200, 67, 42, 0.8), 0 0 60px rgba(200, 67, 42, 0.6), 0 0 90px rgba(200, 67, 42, 0.4), 0 0 120px rgba(200, 67, 42, 0.2)'
          }}
        >
          {siteData.name}
        </motion.h1>
      </div>

      {/* Hero Content (no CTA) */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-[50vh]">
        {/* Event Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-6"
        >
          <p className="text-base md:text-lg font-semibold text-amber-400 tracking-wide text-red-glow">
            {siteData.time}
          </p>
          <p className="text-sm md:text-base font-semibold text-amber-400/95 text-red-glow">
            {siteData.venue} · {siteData.city}
          </p>
          <p className="text-xs md:text-sm font-medium text-amber-400/90 text-red-glow">
            {siteData.address}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute -bottom-1 md:-bottom-1 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
          <p className="text-xs text-white/40 mt-2 tracking-wider">SCROLL</p>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>
    </section>
  );
}
