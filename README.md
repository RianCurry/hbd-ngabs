# Birthday Surprise Website

A mobile-first interactive birthday experience built with Next.js.

## Purpose

An interactive birthday surprise website that guides the recipient through a series of scenes:

1. **Tic-Tac-Toe** — Play a game to unlock the experience
2. **BOOM Birthday** — Animated birthday reveal
3. **Cake & Candles** — Blow out candles, unlock memories
4. **Prize 1** — Open a gift box
5. **Journey** — View the life timeline
6. **My Wish** — Read birthday wishes
7. **Personal Message** — Read a personal letter
8. **Prize 2** — Open another gift
9. **Closing** — Final birthday message

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components organized by scene
├── content/          # Data-driven content (editable separately)
├── types/            # TypeScript type definitions
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
public/
├── images/           # Images
├── videos/           # Videos
├── audio/            # Audio files
└── prizes/           # Prize assets
docs/
├── ARCHITECTURE.md   # Technical architecture docs
├── TODO.md           # Development roadmap
└── OPENCODE_MASTER_PROMPT.md
```

## Manual Development

All personal content lives in `src/content/`. Edit these files to customize:

- `birthday.ts` — Name, age, birthday text
- `memories.ts` — Memory data for candles
- `journey.ts` — Timeline data
- `wishes.ts` — Birthday wishes
- `message.ts` — Personal letter
- `prizes.ts` — Prize content

See `docs/ARCHITECTURE.md` for detailed instructions.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
