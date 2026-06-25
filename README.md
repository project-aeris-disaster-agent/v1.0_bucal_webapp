# BUCAL League

Mobile-first React website for the **Bicol Universities and Colleges Athletic League (BUCAL)** — matches, live stream, stats, and tickets in one place.

## Features

- Hero landing page with BUCAL branding and quick links
- All-in-one matches dashboard with featured match, schedule, standings, and form
- Live stream page with configurable YouTube embed
- Stats & analytics (standings, player leaders, charts)
- Ticket CTAs linking to [ReQuest Tickets](https://requesttix.live/)

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_YOUTUBE_STREAM_URL` | YouTube embed URL (e.g. `https://www.youtube.com/embed/VIDEO_ID`) |

Leave empty to show a "Stream starts soon" placeholder.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Assets

Logos and partner SVGs live in `public/media/`:

- `bucal_logo.svg` — main BUCAL logo
- `bucal_request.svg` — ReQuest Tickets branding
- `bucal_daredevil.svg` — footer partner logo
