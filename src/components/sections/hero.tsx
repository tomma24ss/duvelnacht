'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSiteData } from '@/lib/data';
import { cn } from '@/lib/utils';
import NextImage from 'next/image';
import { withCdn } from '@/lib/cdn';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const siteData = getSiteData();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Top-right maker logo */}
      <div className="hidden sm:block absolute right-3 top-3 sm:right-6 sm:top-6 z-40 pointer-events-none rotate-6">
        {/* Size container for responsiveness */}
        <div className="relative w-20 sm:w-28 md:w-40 aspect-square">
          {/* Red halo to separate from black background */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full blur-xl opacity-50" style={{ background: 'radial-gradient(45% 45% at 50% 50%, rgba(255, 25, 0, 0.5) 0%, rgba(255, 25, 0, 0.25) 45%, rgba(255, 25, 0, 0.0) 75%)' }} />
          {/* White core glow to lift dark pixels */}
          <div className="absolute -inset-1 rounded-full blur-[6px] opacity-35" style={{ background: 'radial-gradient(35% 35% at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.0) 70%)' }} />
          {/* Animated red laser streaks */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-12 pointer-events-none mix-blend-screen" style={{ width: '180%', height: '2px', background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,0,0,0.0) 10%, rgba(255,0,0,0.6) 40%, rgba(255,0,0,0.0) 70%, rgba(0,0,0,0) 100%)', boxShadow: '0 0 18px 4px rgba(255,0,0,0.35)' }} />
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 rotate-[18deg] pointer-events-none mix-blend-screen" style={{ width: '150%', height: '2px', background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,0,0,0.0) 10%, rgba(255,0,0,0.5) 45%, rgba(255,0,0,0.0) 75%, rgba(0,0,0,0) 100%)', boxShadow: '0 0 14px 4px rgba(255,0,0,0.3)' }} />
          {/* The logo itself, tinted and strongly glowed */}
          <NextImage
            src="/media/trademark.png"
            alt="Maker logo"
            fill
            sizes="(min-width: 768px) 10rem, (min-width: 640px) 7rem, 5rem"
            className="relative object-contain drop-shadow-[0_0_0_rgba(0,0,0,0)] saturate-[1.8] contrast-[1.4] brightness-125"
            style={{
              filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.6)) drop-shadow(0 0 8px rgba(255,0,0,0.5)) drop-shadow(0 0 16px rgba(255,0,0,0.35))'
            }}
            loading="eager"
          />
        </div>
      </div>
      {/* Optimized Background Image */}
      <div className="absolute inset-0 z-0">
        <NextImage
          src={withCdn(siteData.heroPoster)}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-700",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
      <div className="absolute inset-0 hero-overlay" />

      {/* Centered Headline Layer */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide md:tracking-widest leading-tight text-off-white animate-pulse-glow max-w-[92vw] break-words"
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

        {/* Scroll Indicator moved out to bottom of hero section */}
      </div>

      {/* Scroll Indicator (pinned to bottom of hero) */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center"
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
          <p className="text-xs text-white/40 mt-2 tracking-wider text-center">SCROLL</p>
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
