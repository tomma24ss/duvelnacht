// Simple script to create placeholder SVG images for development
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'media');

// Ensure directories exist
const dirs = [
  'images',
  'images/artists',
  'sponsors',
  'videos',
  'videos/clips',
  'gallery',
  'gallery/thumbs'
];

dirs.forEach(dir => {
  const fullPath = path.join(publicDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Generate SVG placeholder function
function generateSVG(width, height, text, bgColor = '#1a1a1a', textColor = '#f59e0b') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
}

// Create placeholder files
const placeholders = [
  // Hero
  { path: 'images/hero-poster.jpg', width: 1920, height: 1080, text: 'Hero Poster' },
  
  // Sponsors
  { path: 'sponsors/berlin-brewery.jpg', width: 160, height: 80, text: 'Berlin Brewery' },
  { path: 'sponsors/underground-records.jpg', width: 160, height: 80, text: 'Underground Records' },
  { path: 'sponsors/forge-venue.jpg', width: 160, height: 80, text: 'The Forge' },
  { path: 'sponsors/dark-energy.jpg', width: 120, height: 60, text: 'Dark Energy' },
  { path: 'sponsors/berlin-culture.jpg', width: 120, height: 60, text: 'Berlin Culture' },
  { path: 'sponsors/techno-union.jpg', width: 120, height: 60, text: 'Techno Union' },
  
  // Artists
  { path: 'images/artists/helena-hauff.jpg', width: 400, height: 500, text: 'Helena Hauff' },
  { path: 'images/artists/ancient-methods.jpg', width: 400, height: 500, text: 'Ancient Methods' },
  { path: 'images/artists/kobosil.jpg', width: 400, height: 500, text: 'Kobosil' },
  { path: 'images/artists/dax-j.jpg', width: 400, height: 500, text: 'Dax J' },
  { path: 'images/artists/amelie-lens.jpg', width: 400, height: 500, text: 'Amelie Lens' },
  { path: 'images/artists/rebekah.jpg', width: 400, height: 500, text: 'Rebekah' },
  { path: 'images/artists/dvln-residents.jpg', width: 400, height: 500, text: 'DVLN Residents' },
  
  // Video thumbnails
  { path: 'images/video-thumbs/aftermovie-2024.jpg', width: 640, height: 360, text: 'Aftermovie 2024' },
  { path: 'images/video-thumbs/venue-tour.jpg', width: 640, height: 360, text: 'Venue Tour' },
  { path: 'images/video-thumbs/artist-interviews.jpg', width: 640, height: 360, text: 'Artist Interviews' },
  { path: 'images/video-thumbs/brewing-process.jpg', width: 640, height: 360, text: 'Brewing Process' },
  
  // Gallery
  { path: 'gallery/crowd-energy-1.jpg', width: 800, height: 600, text: 'Crowd Energy' },
  { path: 'gallery/dj-performance-1.jpg', width: 800, height: 600, text: 'DJ Performance' },
  { path: 'gallery/venue-atmosphere-1.jpg', width: 800, height: 600, text: 'Venue Atmosphere' },
  { path: 'gallery/beer-selection.jpg', width: 800, height: 600, text: 'Beer Selection' },
  { path: 'gallery/crowd-energy-2.jpg', width: 800, height: 600, text: 'Crowd Energy 2' },
  
  // Gallery thumbs
  { path: 'gallery/thumbs/crowd-energy-1.jpg', width: 300, height: 200, text: 'Crowd' },
  { path: 'gallery/thumbs/dj-performance-1.jpg', width: 300, height: 200, text: 'DJ' },
  { path: 'gallery/thumbs/venue-atmosphere-1.jpg', width: 300, height: 200, text: 'Venue' },
  { path: 'gallery/thumbs/beer-selection.jpg', width: 300, height: 200, text: 'Beer' },
  { path: 'gallery/thumbs/crowd-energy-2.jpg', width: 300, height: 200, text: 'Crowd 2' },
  { path: 'gallery/thumbs/stage-setup.jpg', width: 300, height: 200, text: 'Stage' },
];

// Generate placeholder files
placeholders.forEach(({ path: filePath, width, height, text }) => {
  const fullPath = path.join(publicDir, filePath);
  const svg = generateSVG(width, height, text);
  
  try {
    fs.writeFileSync(fullPath.replace('.jpg', '.svg'), svg);
    console.log(`Created: ${filePath.replace('.jpg', '.svg')}`);
  } catch (err) {
    console.error(`Error creating ${filePath}:`, err.message);
  }
});

// Create placeholder video files (just empty files for now)
const videoFiles = [
  'videos/hero-reel.mp4',
  'videos/aftermovie-2024.mp4',
  'videos/venue-tour.mp4', 
  'videos/artist-interviews.mp4',
  'videos/brewing-process.mp4',
  'videos/clips/helena-hauff-clip.mp4',
  'videos/clips/kobosil-clip.mp4',
  'gallery/stage-setup.mp4'
];

videoFiles.forEach(filePath => {
  const fullPath = path.join(publicDir, filePath);
  try {
    fs.writeFileSync(fullPath, '');
    console.log(`Created placeholder: ${filePath}`);
  } catch (err) {
    console.error(`Error creating ${filePath}:`, err.message);
  }
});

console.log('Placeholder generation complete!');
