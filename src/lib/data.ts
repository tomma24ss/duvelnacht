import onepageData from '@/data/onepage.json';
import fs from 'fs';
import path from 'path';

export interface SiteData {
  name: string;
  tagline: string;
  altTagline: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  address: string;
  contactEmail: string;
  ticketURL: string;
  heroVideo: string;
  heroPoster: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    spotify: string;
  };
  contacts: {
    general: string;
    press: string;
    booking: string;
  };
}


export interface Video {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
  caption: string;
  duration: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
  year: string;
}


export interface Legal {
  terms: string;
  privacy: string;
  cookies: string;
}

export interface OnepageData {
  site: SiteData;
  videos: Video[];
  legal: Legal;
}

// Type-safe data access
export const getData = (): OnepageData => {
  return onepageData as unknown as OnepageData;
};

// Specific data getters
export const getSiteData = (): SiteData => getData().site;
export const getVideos = (): Video[] => getData().videos;
export const getGallery = (): GalleryItem[] => {
  const galleryDir = path.join(process.cwd(), 'public', 'media', 'gallery');
  let files: string[] = [];
  try {
    files = fs.readdirSync(galleryDir);
  } catch {
    return [];
  }

  const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
  const videoExtensions = new Set(['.mp4', '.webm', '.mov']);

  const items: GalleryItem[] = files
    .filter((filename) => {
      const ext = path.extname(filename).toLowerCase();
      return imageExtensions.has(ext) || videoExtensions.has(ext);
    })
    .map((filename) => {
      const ext = path.extname(filename).toLowerCase();
      const type: 'image' | 'video' = imageExtensions.has(ext) ? 'image' : 'video';
      const base = path.basename(filename, ext);
      return {
        id: base,
        type,
        src: `/media/gallery/${filename}`,
        thumbnail: undefined,
        alt: base,
        year: '',
      } as GalleryItem;
    });

  return items;
};
export const getLegal = (): Legal => getData().legal;

// Helper functions
export const getVideoById = (id: string): Video | undefined => {
  return getVideos().find(video => video.id === id);
};

export const getGalleryItemById = (id: string): GalleryItem | undefined => {
  return getGallery().find(item => item.id === id);
};

// Filtering helpers
export const filterGalleryByYear = (year: string): GalleryItem[] => {
  return getGallery().filter(item => item.year === year);
};

export const filterGalleryByType = (type: 'image' | 'video'): GalleryItem[] => {
  return getGallery().filter(item => item.type === type);
};
