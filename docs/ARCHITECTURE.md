# Architecture

## Application Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page (renders SceneController)
│   └── globals.css         # Global styles + reduced-motion
├── components/
│   ├── game/
│   │   └── TicTacToe.tsx   # Scene 1: Tic-Tac-Toe game
│   ├── birthday/
│   │   └── BirthdayReveal.tsx # Scene 2: BOOM birthday reveal
│   ├── cake/
│   │   └── CakeScene.tsx   # Scene 3: Cake + candles + memories
│   ├── prize/
│   │   ├── PrizeScene.tsx   # Scene 4: Prize 1
│   │   └── Prize2Scene.tsx  # Scene 8: Prize 2
│   ├── journey/
│   │   └── JourneyScene.tsx # Scene 5: Journey timeline
│   ├── wish/
│   │   └── WishScene.tsx    # Scene 6: My Wish
│   ├── message/
│   │   └── MessageScene.tsx # Scene 7: Personal Message
│   ├── closing/
│   │   └── ClosingScene.tsx # Scene 9: Closing
│   └── shared/
│       ├── SceneController.tsx # Scene orchestration
│       └── AudioControl.tsx    # Audio toggle
├── content/
│   ├── birthday.ts          # Name, age, birthday text
│   ├── memories.ts          # Candle memory data
│   ├── journey.ts           # Journey timeline data
│   ├── wishes.ts            # Wish content
│   ├── message.ts           # Personal message content
│   └── prizes.ts            # Prize 1 & 2 data
├── types/
│   └── index.ts             # All TypeScript types
├── hooks/                   # (reserved for future hooks)
└── lib/                     # (reserved for future utilities)
```

## Scene System

The app uses a linear scene progression model.

**Type:** `BirthdayScene` — a union of 9 string literals.

**Order:** Defined in `SCENE_ORDER` array in `src/types/index.ts`.

**Orchestration:** `SceneController` manages the current scene index and renders the appropriate component via a `sceneComponents` map.

**Progression:** Each scene component receives an `onComplete` callback. When called, the controller advances to the next scene.

**Transitions:** `AnimatePresence` with `mode="wait"` handles enter/exit animations between scenes.

## State Flow

```
SceneController (currentSceneIndex)
  ├── manages scene index
  ├── passes onComplete → goNext to current scene
  └── renders scene component based on index

Scene Components (local state only)
  ├── TicTacToe: board, turns, result
  ├── CakeScene: lit candle states, active memory
  ├── Prize scenes: isOpen toggle
  └── JourneyScene: expanded index
```

No global state management. Each scene manages its own local state.

## Component Responsibilities

| Component | Role |
|---|---|
| `SceneController` | Scene orchestration, progress indicator, audio control |
| `TicTacToe` | Playable game with AI, win/loss/draw detection |
| `BirthdayReveal` | Animated birthday message reveal |
| `CakeScene` | Candle interaction, memory display |
| `PrizeScene` / `Prize2Scene` | Gift box open/reveal |
| `JourneyScene` | Expandable timeline items |
| `WishScene` | Static wish display |
| `MessageScene` | Personal letter display |
| `ClosingScene` | Final birthday message |
| `AudioControl` | Background music toggle |

## Content Architecture

All personal content lives in `src/content/`. Each file exports typed data objects.

To update content: edit the corresponding file in `src/content/`. No component changes needed.

## Asset Architecture

```
public/
├── images/     # Photos, backgrounds
├── videos/     # Video content
├── audio/      # BGM (bgm.mp3)
└── prizes/     # Prize-related assets
```

Place assets in the appropriate directory. Components use placeholder fallbacks when assets are missing.

## How-To Guide

### Add a Journey Item

Edit `src/content/journey.ts`:

```ts
{
  period: "YOUR PERIOD",
  title: "Title",
  description: "Description",
  image: "" // or path to image in public/images/
}
```

### Add a Memory

Edit `src/content/memories.ts`:

```ts
{
  id: 4,
  title: "Memory Title",
  description: "Memory description",
  image: "" // or path to image
}
```

### Replace a Prize

Edit `src/content/prizes.ts`:

```ts
export const prize1 = {
  title: "New Title",
  description: "New description",
  image: "" // or path to image
};
```

### Replace Personal Content

- **Birthday text:** Edit `src/content/birthday.ts`
- **Wishes:** Edit `src/content/wishes.ts`
- **Message:** Edit `src/content/message.ts`
