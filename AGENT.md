# Surprise Birthday Project Rules

## Current Flow

Tic-Tac-Toe
→ BOOM! Happy Birthday
→ Cake & Candles
→ My Journey
→ My Wish
→ Personal Message
→ Closing

## Existing Application

The existing application code is the source of truth for:

- scene progression
- application state
- Tic-Tac-Toe logic
- candle interaction logic
- memory unlocking logic
- functional behavior

Do not replace working functionality with static UI.

## Google Stitch References

Approved Google Stitch reference code is stored in:

docs/design/stitch/

Current references:

- 01-tic-tac-toe.md
- 02-boom-birthday.md
- 03-cake-candles.md
- 04-my-journey.md

These files are the source of truth for:

- visual layout
- component composition
- spacing
- typography
- colors
- button appearance
- decorative elements

Do not blindly copy them into the production source.

Analyze and adapt the reference code into the existing Next.js,
React, TypeScript, and Tailwind architecture.

## Implementation Rules

- Preserve existing scene order.
- Preserve existing interaction logic.
- Do not rebuild the project from scratch.
- Do not add new major scenes.
- Do not generate images.
- Do not add unnecessary dependencies.
- Do not invent personal content.
- Prefer existing project dependencies.

## Validation

After implementation:

1. Run npm run lint
2. Run npm run build
3. Fix errors introduced by the implementation.
