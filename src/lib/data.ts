import onepageData from '@/data/onepage.json';
// Move server-only fs logic to lib/gallery.ts to avoid bundling 'fs' on client

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
// Note: getGallery is server-only in '@/lib/gallery' and must be imported directly from there in server components.
export const getLegal = (): Legal => getData().legal;

// Helper functions
export const getVideoById = (id: string): Video | undefined => {
  return getVideos().find(video => video.id === id);
};

// Gallery helpers removed. Import from '@/lib/gallery' in server components if needed.
