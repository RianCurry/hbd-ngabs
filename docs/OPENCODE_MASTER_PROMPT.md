# MASTER IMPLEMENTATION PROMPT
# Birthday Surprise Website

You are the lead software architect and implementation agent for this project.

Your responsibility is to build the HIGH-LEVEL technical foundation of the
birthday surprise website.

IMPORTANT:

You are NOT responsible for creating the final polished website.

You are responsible for creating a clean, maintainable, working skeleton
that I will continue developing manually.

==================================================
1. PROJECT GOAL
==================================================

Build a mobile-first interactive birthday experience.

The experience must follow EXACTLY this sequence:

Tic-Tac-Toe
→ BOOM Birthday
→ Cake / Candles
→ Prize 1
→ Journey
→ My Wish
→ Personal Message
→ Prize 2
→ Closing

Do not add additional major scenes.

Do not remove any scene.

Do not change the order.

==================================================
2. TECH STACK
==================================================

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

Use React state/context where appropriate.

Do NOT introduce:

- database
- authentication
- backend API
- ORM
- Redis
- WebSocket
- CMS
- external backend
- unnecessary state management libraries

The project should remain a frontend-focused application.

==================================================
3. ARCHITECTURE
==================================================

Create a single interactive experience.

The main page should control the current scene.

Use a clear scene/state model.

Example conceptual model:

type BirthdayScene =
  | "game"
  | "birthday"
  | "cake"
  | "prize-1"
  | "journey"
  | "my-wish"
  | "message"
  | "prize-2"
  | "closing";

The exact implementation is your decision, but the architecture must remain
simple and understandable.

Scene progression must be explicit.

==================================================
4. PROJECT STRUCTURE
==================================================

Create a maintainable structure similar to:

src/
├── app/
├── components/
│   ├── game/
│   ├── birthday/
│   ├── cake/
│   ├── prize/
│   ├── journey/
│   ├── wish/
│   ├── message/
│   ├── closing/
│   └── shared/
├── content/
├── hooks/
├── lib/
└── types/

public/
├── images/
├── videos/
├── audio/
└── prizes/

docs/

You may adjust the structure when there is a strong technical reason.

Do not create unnecessary abstractions.

==================================================
5. SCENE 1 — TIC-TAC-TOE
==================================================

Implement a functional 3x3 Tic-Tac-Toe skeleton.

Requirements:

- playable on mobile;
- touch friendly;
- player vs simple AI;
- win detection;
- loss detection;
- draw detection;
- retry;
- clear result state;
- ability to proceed after the game is completed.

The AI does not need to be sophisticated.

The important requirement is that the game is reliable.

Use placeholder Nailong visuals or simple placeholders.

Do NOT generate images.

Do NOT search for or download random assets.

==================================================
6. SCENE 2 — BOOM BIRTHDAY
==================================================

Create the birthday reveal scene.

Placeholder content:

"BOOM!"

"HAPPY BIRTHDAY!!!"

"FICHA"

"21"

The exact final visual design will be implemented later by the developer.

Implement:

- scene transition;
- basic reveal animation;
- placeholder confetti effect if appropriate;
- continue action.

Do not over-design this scene.

==================================================
7. SCENE 3 — CAKE / CANDLES
==================================================

Create the cake interaction architecture.

Requirements:

- cake component;
- multiple candle components;
- candle state;
- candle extinguish interaction;
- progress tracking;
- memory unlock event.

The candle interaction must work on touch devices.

Use placeholder cake and candle visuals.

DO NOT generate images.

Each candle should be capable of triggering a memory.

Example conceptual flow:

candle extinguished
→ memory unlocked
→ memory displayed
→ user continues
→ next candle available

The exact visual implementation will be refined manually.

==================================================
8. SCENE 4 — PRIZE 1
==================================================

Create a reusable prize interaction.

Requirements:

- locked before cake completion;
- prize box;
- open interaction;
- reveal state;
- placeholder prize content;
- continue action.

Do not invent the final prize.

Use placeholder content such as:

"PRIZE CONTENT GOES HERE"

==================================================
9. SCENE 5 — JOURNEY
==================================================

Create a reusable journey/timeline component.

Default structure:

- SMP
- SMK/SMA
- KULIAH
- NOW

The content must be data-driven.

Example:

journey.ts

[
  {
    period: "...",
    title: "...",
    description: "...",
    image: "..."
  }
]

Do not invent personal history.

Use placeholder data.

The developer will replace it later.

==================================================
10. SCENE 6 — MY WISH
==================================================

Create a dedicated My Wish scene.

It must be separate from Personal Message.

Purpose:

Future-oriented wishes for the birthday recipient.

Use placeholder content only.

Example:

"My Wish"

"YOUR WISH CONTENT GOES HERE"

Do not invent personal wishes.

==================================================
11. SCENE 7 — PERSONAL MESSAGE
==================================================

Create a personal letter/message component.

Use placeholder content.

Example:

"Dear Ficha"

"PERSONAL MESSAGE GOES HERE"

Do not generate romantic or personal content.

The developer will provide the final text.

==================================================
12. SCENE 8 — PRIZE 2
==================================================

Create a second prize interaction.

It must be independent from Prize 1.

Requirements:

- locked until Personal Message is completed;
- open interaction;
- reveal state;
- placeholder content.

Do not invent the prize.

==================================================
13. SCENE 9 — CLOSING
==================================================

Create a simple final scene.

Placeholder:

"HAPPY BIRTHDAY"

"FICHA"

"21"

The developer will refine the final message and visuals.

==================================================
14. CONTENT ARCHITECTURE
==================================================

Separate content from presentation.

Create:

src/content/
├── birthday.ts
├── memories.ts
├── journey.ts
├── wishes.ts
├── message.ts
└── prizes.ts

All personal content should be replaceable without modifying components.

==================================================
15. ASSET ARCHITECTURE
==================================================

Prepare:

public/images/
public/videos/
public/audio/
public/prizes/

Do not generate images.

Do not download external images.

Use placeholders when assets are unavailable.

==================================================
16. RESPONSIVE FOUNDATION
==================================================

Design mobile-first.

The website must work on:

- smartphone;
- tablet;
- desktop.

Pay particular attention to:

- Tic-Tac-Toe touch targets;
- cake dimensions;
- candle touch targets;
- text readability;
- image scaling;
- video scaling;
- no horizontal overflow.

Do not spend excessive time polishing visual design.

Create a solid foundation.

==================================================
17. ACCESSIBILITY
==================================================

Implement basic accessibility:

- semantic HTML;
- buttons for interactions;
- keyboard support where practical;
- visible focus states;
- alt attributes;
- reduced-motion consideration.

==================================================
18. AUDIO
==================================================

Create an audio architecture but do not force autoplay.

Provide a simple AudioControl component.

The final music asset will be provided later.

Do not download copyrighted music.

==================================================
19. ERROR HANDLING
==================================================

The application must not get stuck silently.

Every major scene transition must have a valid state.

Avoid:

- infinite loading;
- inaccessible next buttons;
- dead-end states;
- broken scene transitions.

==================================================
20. CODE QUALITY
==================================================

Prioritize:

- readable code;
- simple components;
- clear naming;
- minimal abstraction;
- reusable components where appropriate;
- TypeScript types;
- no unnecessary dependencies.

Do not optimize prematurely.

Do not build a complex architecture for a small website.

==================================================
21. PLACEHOLDER POLICY
==================================================

Whenever information is unknown, use an explicit placeholder.

Examples:

"TODO: birthday message"

"TODO: journey content"

"TODO: prize content"

"TODO: memory image"

NEVER invent personal information.

==================================================
22. TODO SYSTEM
==================================================

At the end of implementation, create:

docs/TODO.md

Group TODOs into:

1. Content
2. Visual Design
3. Assets
4. Animation
5. Interaction Polish
6. Mobile
7. Accessibility
8. Testing
9. Deployment

This TODO file is important.

It will become the manual development roadmap.

==================================================
23. DOCUMENTATION
==================================================

Create:

docs/ARCHITECTURE.md

Explain:

- application structure;
- scene system;
- state flow;
- component responsibilities;
- content architecture;
- asset architecture;
- how to add a new journey item;
- how to add a memory;
- how to replace a prize;
- how to replace personal content.

Also update README.md with:

- project purpose;
- installation;
- development command;
- build command;
- project structure;
- manual development instructions.

==================================================
24. VALIDATION
==================================================

Before finishing:

Run:

- lint;
- type checking;
- production build.

Fix all errors.

Then manually verify the complete flow:

Tic-Tac-Toe
→ Birthday
→ Cake
→ Prize 1
→ Journey
→ My Wish
→ Personal Message
→ Prize 2
→ Closing

Do not stop after creating files.

The basic experience must actually run.

==================================================
25. FINAL RESPONSIBILITY
==================================================

Your job ends when:

- architecture works;
- all scenes exist;
- scene progression works;
- interactions have functional foundations;
- content is data-driven;
- placeholders are clearly marked;
- documentation exists;
- TODO.md exists;
- build succeeds.

Do NOT attempt to make the website visually perfect.

Do NOT make creative decisions about the recipient's personal story.

Do NOT invent content.

Build the foundation.

After completing the implementation, report:

1. What was created
2. Files added/changed
3. Architecture summary
4. What works
5. What remains TODO
6. Commands used for validation
7. Any technical decisions that require manual review

STOP after the high-level implementation is complete.

