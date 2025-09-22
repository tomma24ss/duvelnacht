# Media Guide

Drop your own images and videos here. Keep filenames simple (lowercase, hyphens).

Structure:

- images/
  - hero-poster.(jpg|png|webp|avif) – background image for the hero
- videos/
  - any event reels or background videos (optional)
- gallery/
  - full-size gallery images and videos
- sponsors/
  - sponsor logos (SVG or PNG preferred)

How to reference in src/data/onepage.json:

- Hero poster:
  "site": { "heroPoster": "/media/images/hero-poster.jpg" }

- Tickets URL:
  "site": { "ticketURL": "https://your-ticket-link" }

- Gallery items:
  "gallery": [
    { "id": "photo-1", "type": "image", "src": "/media/gallery/photo-1.jpg", "alt": "Crowd in red light", "year": "2025" }
  ]

Tips:
- Prefer AVIF/WebP for images, MP4 (H.264) for videos.
- Use descriptive alt text for accessibility.
- Keep images reasonably sized (e.g., 1600px wide max) to avoid huge files.
