'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
  title?: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaItem[];
  initialIndex?: number;
  className?: string;
}

export function Lightbox({ 
  isOpen, 
  onClose, 
  items, 
  initialIndex = 0,
  className 
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const currentItem = items[currentIndex];
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);
  
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);
  
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);
  
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          if (currentItem?.type === 'video') {
            togglePlay();
          }
          break;
        case 'm':
        case 'M':
          if (currentItem?.type === 'video') {
            toggleMute();
          }
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentIndex, isPlaying, isMuted, currentItem?.type, onClose, goToPrevious, goToNext, togglePlay, toggleMute]);
  
  // Reset video state when changing items
  useEffect(() => {
    if (currentItem?.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentIndex, currentItem?.type]);
  
  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleVideoClick = () => {
    togglePlay();
  };
  
  if (!currentItem) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-50 bg-black/95 backdrop-blur-sm",
            className
          )}
          onClick={onClose}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 focus-glow"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close lightbox</span>
          </Button>
          
          {/* Navigation buttons */}
          {items.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 focus-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft className="h-8 w-8" />
                <span className="sr-only">Previous item</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 focus-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight className="h-8 w-8" />
                <span className="sr-only">Next item</span>
              </Button>
            </>
          )}
          
          {/* Media container */}
          <div 
            className="flex items-center justify-center min-h-screen p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-full max-h-full"
            >
              {currentItem.type === 'image' ? (
                <Image
                  src={currentItem.src}
                  alt={currentItem.alt || ''}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="max-w-full max-h-[80vh] object-contain"
                  loading={currentIndex === initialIndex ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ) : (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={currentItem.src}
                    className="max-w-full max-h-[80vh] object-contain cursor-pointer"
                    onClick={handleVideoClick}
                    muted={isMuted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controls={false}
                    preload="metadata"
                  />
                  
                  {/* Video controls overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isPlaying ? 0 : 1 }}
                      className="bg-black/50 rounded-full p-4 pointer-events-auto cursor-pointer"
                      onClick={handleVideoClick}
                    >
                      <Play className="h-12 w-12 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Video control buttons */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 bg-black/50"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 bg-black/50"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Caption */}
              {(currentItem.caption || currentItem.title) && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
                >
                  {currentItem.title && (
                    <h3 className="font-semibold text-lg mb-1">{currentItem.title}</h3>
                  )}
                  {currentItem.caption && (
                    <p className="text-sm text-white/80">{currentItem.caption}</p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Thumbnail navigation */}
          {items.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  className={cn(
                    "w-12 h-8 rounded overflow-hidden border-2 transition-colors",
                    index === currentIndex 
                      ? "border-white" 
                      : "border-transparent hover:border-white/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt=""
                      width={48}
                      height={32}
                      className="w-full h-full object-cover"
                      loading={index === currentIndex ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <Play className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
          
          {/* Item counter */}
          {items.length > 1 && (
            <div className="absolute top-4 left-4 text-white/80 text-sm bg-black/50 backdrop-blur-sm rounded px-3 py-1">
              {currentIndex + 1} / {items.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
