# DUVELNACHT

> Where good beers meet bad influence.

A premium, dark-themed one-page website for Duvelnacht - Berlin's devilish nocturnal celebration of electronic music and craft beer. Built with Next.js, TypeScript, Tailwind CSS, and fully containerized with Docker.

## 🔥 Features

- **Dark-first Design**: Premium dark theme with ember/amber accents and subtle grain texture
- **Immersive Media**: Fullscreen video hero, horizontal video reels, masonry gallery with lightbox
- **Artist Lineup**: Interactive artist cards with search/filter, detailed modals with social links
- **Smooth Animations**: Framer Motion micro-interactions with reduced-motion support
- **Mobile-first**: Responsive design optimized for all devices
- **Performance**: Optimized for Lighthouse scores ≥95 on mobile and desktop
- **Accessibility**: WCAG AA compliant with keyboard navigation and focus states
- **Containerized**: Complete Docker setup for easy deployment

## 🚀 Quick Start with Docker

### Development
```bash
# Clone and start development environment
docker-compose up --build

# Or run development server locally
npm install
npm run dev
```

### Production
```bash
# Build and run production container
docker-compose -f docker-compose.yml --profile production up --build
```

The application will be available at:
- Development: http://localhost:3000
- Production: http://localhost (with nginx proxy)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections (Hero, About, Lineup, etc.)
│   └── navigation.tsx     # Sticky navigation with scroll-spy
├── data/                  # Content configuration
│   └── onepage.json      # All site content and settings
├── hooks/                 # Custom React hooks
├── lib/                  # Utilities and data access
└── styles/               # Global styles and design system

public/media/              # Media assets
├── images/               # Photos and graphics
├── videos/               # Video content
└── gallery/              # Gallery images and videos
```

## 🎨 Design System

The visual identity uses a carefully crafted dark palette:

- **Near Black** (`#0e0e10`) - Primary background
- **Off White** (`#faf8f0`) - Primary text
- **Ember Red** (`#c8432a`) - Primary actions/CTAs
- **Beer Amber** (`#f59e0b`) - Highlights and accents
- **Deep Crimson** (`#991b1b`) - Dark accents
- **Soft Charcoal** (`#37373d`) - Surface elements

Typography combines **Cinzel** (display) and **Inter** (UI/body) with custom glow effects and grain texture overlays.

## 📝 Content Management

All content is managed through `src/data/onepage.json`. Update this file to:

- Change event details (date, venue, lineup)
- Modify copy and messaging
- Update social links and contact info
- Add/remove artists, videos, and gallery items
- Configure ticket tiers and pricing

### Adding Media

1. **Images**: Place in `public/media/images/` and reference in `onepage.json`
2. **Videos**: Place in `public/media/videos/` and reference in `onepage.json`
3. **Gallery**: Place in `public/media/gallery/` with thumbnails in `gallery/thumbs/`

Recommended formats:
- Images: AVIF/WebP with JPEG fallback
- Videos: MP4 (H.264) with poster images

## 🛠 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Docker Development
```bash
# Build development container
docker-compose up --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Adding New Sections

1. Create component in `src/components/sections/`
2. Add to main page in `src/app/page.tsx`
3. Update navigation items in `src/components/navigation.tsx`
4. Add content structure to `src/data/onepage.json`

## 🎭 Customization

### Colors
Update CSS custom properties in `src/app/globals.css`:
```css
:root {
  --ember: 200 67 42;      /* Primary CTA color */
  --amber: 245 158 11;     /* Accent color */
  --crimson: 153 27 27;    /* Dark accent */
  /* ... */
}
```

### Typography
Modify font imports in `src/app/layout.tsx` and update CSS variables:
```css
--font-display: 'Your Display Font', serif;
--font-sans: 'Your Sans Font', sans-serif;
```

### Animations
All animations respect `prefers-reduced-motion`. Customize in:
- `src/app/globals.css` for keyframes
- Component files for Framer Motion animations

## 🚀 Deployment

### Docker Production
```bash
# Build production image
docker build -t duvelnacht .

# Run with docker-compose
docker-compose --profile production up -d
```

### Vercel/Netlify
The app is ready for deployment on modern hosting platforms:
1. Connect your git repository
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Deploy!

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with ES2020 support

## 🎵 Performance

- **Lighthouse Scores**: ≥95 on all metrics
- **Bundle Size**: Optimized with Next.js tree shaking
- **Images**: Responsive with blur-up placeholders
- **Videos**: Lazy loaded with muted autoplay
- **Fonts**: Preloaded with font-display: swap

## 🔒 Security

- CSP headers for XSS protection
- Secure cookie settings
- HTTPS redirect in production
- Input validation and sanitization

## 📄 License

This project is created for Duvelnacht. All rights reserved.

---

**Built with ❤️ and 🍺 for the Berlin underground scene**

For questions or support, contact: [info@duvelnacht.com](mailto:info@duvelnacht.com)