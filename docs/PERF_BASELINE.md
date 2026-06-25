# Mobile performance baseline

Recorded after implementing the mobile optimization plan (2026-06-26).

## Build output (post-optimization)

| Chunk | Size (gzip) | Loads when |
|-------|-------------|------------|
| `index-*.js` | ~2.5 KB | Every route |
| `vendor-*.js` | ~67 KB | Every route |
| `PageBackground-*.js` | ~6.7 KB | Pages with background shell |
| `three-*.js` | ~126 KB | Desktop only (WebGL shader) |
| `motion-*.js` | ~42 KB | Match/vote routes |
| `recharts-*.js` | ~101 KB | Stats → Analytics tab only |
| Route chunks | 1.6–5 KB each | Per navigation |

Open `dist/stats.html` after `npm run analyze` for the full treemap.

## Static assets (public/media)

| Asset | Approx. size |
|-------|----------------|
| `bucal_background.webp` | Desktop background |
| `bucal_background_mobile.webp` | Not loaded on touch devices |
| `bucal_logo.svg` | Header/hero (557 KB — candidate for future WebP) |
| `ads/ads_v1_2026.webp` | Mobile/static ad fallback |
| `ads/ads_v1_2026.gif` | Desktop animated ad |
| `school_logo/*.webp` | 128×128 team avatars |
| `favicon.webp` | Tab icon |

Removed from deploy: unused banner/request/daredevil SVGs (~18 MB), full-size background SVG, school logo SVGs.

## Mobile behavior changes

- **WebGL shader**: Off on `(hover: none) and (pointer: coarse)` and `prefers-reduced-motion: reduce`.
- **Background image**: Off on touch devices; CSS gradient only.
- **Backdrop blur**: Off on mobile header/nav; solid backgrounds.
- **Live animations**: Only under `[data-live-ui="true"]` (Home, Matches, Live).
- **YouTube**: Click-to-play facade; iframe loads on user action.
- **Ad**: Static WebP on mobile; GIF on desktop; pauses when tab hidden.

## Device validation checklist

Run on a real phone (Chrome Android + Safari iOS):

1. Open `/tickets` — scroll 15s; target ~55–60 FPS (DevTools → Rendering → Frame stats).
2. Open `/` — confirm no YouTube iframe until play tap; scroll should feel smooth.
3. Network tab — confirm **no** `bucal_background.svg` or `three-*.js` on phone.
4. Open `/stats` → Analytics — confirm `recharts-*.js` loads only after tab switch.
5. Re-run Lighthouse mobile on `/tickets` and record TBT vs pre-deploy baseline.

## Commands

```bash
npm run optimize:images   # Regenerate WebP assets from media/
npm run analyze           # Production build + dist/stats.html
npm run preview           # Local prod server for device testing
```
