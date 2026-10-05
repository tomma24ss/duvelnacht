**Website:** [duvelnacht.be](https://duvelnacht.be/)

# DUVELNACHT

This is the repository for the [Duvelnacht](https://duvelnacht.be/) website. The site was created for Duvelnacht.

Duvelnacht is the yearly party of [Jongenschiro Balegem](https://www.jongenschirobalegem.be/). It runs from 21:00 to 04:00 at Den Amb8, Lange Ambachtstraat 42, 9860 Oosterzele. Tickets are limited and sold through the Chiro Balegem WeTicket shop. The name plays on a duivel fuif, and Duvel is also sold at the party. The event is not sponsored by Duvel.

The public page is a single dark screen: the event hero, a ticket block, a photo gallery, local sponsors, and links to [Instagram](https://www.instagram.com/duvelnacht_chirobalegem/) and [Facebook](https://www.facebook.com/duvelnacht).

Built with Next.js, TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

```bash
npm run build
npm start
```

## Project structure

```
src/
├── app/                         # Next.js App Router
├── components/sections/         # Hero, tickets, gallery, sponsors, footer
├── data/onepage.json            # Event details and ticket link
└── lib/                         # Site data and gallery helpers

public/media/                    # Photos, posters, and sponsor logos
```

Event copy (date, venue, address, ticket URL) lives in `src/data/onepage.json`. Gallery photos live in `public/media/gallery/`.

## License

This project is created for Duvelnacht. All rights reserved.
