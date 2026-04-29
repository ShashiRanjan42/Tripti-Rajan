# Tripti Ranjan Weds Rajan Kumar — Wedding Invitation Website

A beautiful, animated mobile-first wedding invitation website for the wedding of **Tripti Ranjan & Rajan Kumar** on **7th May 2026**, East Champaran, Bihar.

## Features

- **Mobile-first design** — optimized for smartphones, works on all devices
- **Dark / Light mode** toggle (persisted in localStorage)
- **Animated splash screen** with tap-to-enter and music autoplay
- **Background music** — auto-plays at 40% volume (add `public/wedding-music.mp3`)
- **Petal rain animation** — floating rose petals throughout
- **Rotating mandala** decorations
- **SVG wedding ceremony animation** — Jaimala, Fera, Sacred Fire
- **Countdown timer** — live countdown to the wedding date
- **4-event schedule** with Google Calendar save links
- **Bride & Groom details** with family information
- **Family photo** placeholder (replace with your photo)
- **Get Location** — opens Google Maps
- **Share Invitation** — copies URL to clipboard
- **Ornate gold decorative elements** throughout

## Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Framework   | TanStack Start                     |
| Frontend    | React 19, TanStack Router v1       |
| Build       | Vite 7                             |
| Styling     | Tailwind CSS 4 + CSS custom props  |
| Fonts       | Great Vibes, Cinzel, Lora (Google) |
| Deployment  | Netlify                            |

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000` (or via Netlify CLI on port 8888).

## Adding Music

Place your wedding music file at `public/wedding-music.mp3`. See `public/MUSIC-SETUP.txt` for details.

## Adding Photos

- **Couple photos**: Place images in `public/` and update `PersonPhoto` components in `src/routes/index.tsx`
- **Family photo**: Add `public/family-photo.jpg` and update the family photo section

## Production Build

```bash
npm run build
```

Output goes to `dist/client/`. Deployed automatically to Netlify on push.
