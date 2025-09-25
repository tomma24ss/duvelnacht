'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { withCdn } from '@/lib/cdn';

const sponsors = [
  {
    id: 'berlin-brewery',
    name: 'Berlin Craft Brewery',
    logo: '/media/sponsors/berlin-brewery.svg',
    tier: 'main'
  },
  {
    id: 'underground-records',
    name: 'Underground Records',
    logo: '/media/sponsors/underground-records.svg',
    tier: 'main'
  },
  {
    id: 'forge-venue',
    name: 'The Forge',
    logo: '/media/sponsors/forge-venue.svg',
    tier: 'main'
  },
  {
    id: 'dark-energy',
    name: 'Dark Energy Drinks',
    logo: '/media/sponsors/dark-energy.svg',
    tier: 'supporting'
  },
  {
    id: 'berlin-culture',
    name: 'Berlin Culture Fund',
    logo: '/media/sponsors/berlin-culture.svg',
    tier: 'supporting'
  },
  {
    id: 'techno-union',
    name: 'Techno Union',
    logo: '/media/sponsors/techno-union.svg',
    tier: 'supporting'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function SponsorsSection() {
  const mainSponsors = [...sponsors.filter(s => s.tier === 'main')].sort(() => Math.random() - 0.5);
  const supportingSponsors = [...sponsors.filter(s => s.tier === 'supporting')].sort(() => Math.random() - 0.5);

  return (
    <section id="sponsors" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-glow">
              Sponsors
            </h2>
          </motion.div>

          {/* Main Sponsors */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-center text-lg md:text-xl text-amber-400 font-medium mb-8">
              Hoofdpartners
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {mainSponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 h-32 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                    <Image
                      src={withCdn(sponsor.logo)}
                      alt={sponsor.name}
                      width={160}
                      height={80}
                      className="max-w-full max-h-16 object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Supporting Sponsors */}
          <motion.div variants={itemVariants}>
            <h3 className="text-center text-base md:text-lg text-off-white/60 font-medium mb-6">
              Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center">
              {supportingSponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="group"
                >
                  <div className="bg-white/3 backdrop-blur-sm rounded-lg p-6 h-20 flex items-center justify-center hover:bg-white/5 transition-all duration-300">
                    <Image
                      src={withCdn(sponsor.logo)}
                      alt={sponsor.name}
                      width={120}
                      height={60}
                      className="max-w-full max-h-12 object-contain filter brightness-75 group-hover:brightness-90 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Line */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-off-white/40">
              Partner worden? Mail ons: <a href="mailto:sponsors@duvelnacht.com" className="text-amber-400 hover:text-amber-300 transition-colors">sponsors@duvelnacht.com</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
