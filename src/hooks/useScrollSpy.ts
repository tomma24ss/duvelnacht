'use client';

import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) {
  const [activeSection, setActiveSection] = useState<string>('');
  const { threshold = 0.3, rootMargin = '-20% 0px -35% 0px' } = options;

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold,
      rootMargin,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        
        setActiveSection(mostVisible.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
}

// Hook for detecting if user has scrolled past hero
export function useScrollPastHero() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setHasScrolled(window.scrollY > heroHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return hasScrolled;
}

// Hook for smooth scrolling to sections
export function useScrollToSection() {
  const scrollToSection = (sectionId: string, offset: number = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return scrollToSection;
}
