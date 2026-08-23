---
name: Jubilee
colors:
  surface: '#fff9f0'
  surface-dim: '#dfd9d1'
  surface-bright: '#fff9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3ea'
  surface-container: '#f3ede4'
  surface-container-high: '#ede7df'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1b16'
  on-surface-variant: '#57423e'
  inverse-surface: '#32302a'
  inverse-on-surface: '#f6f0e7'
  outline: '#8b716d'
  outline-variant: '#dec0ba'
  surface-tint: '#a53b29'
  primary: '#a53b29'
  on-primary: '#ffffff'
  primary-container: '#ff7e67'
  on-primary-container: '#731709'
  inverse-primary: '#ffb4a6'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fdd73b'
  on-secondary-container: '#715d00'
  tertiary: '#006a69'
  on-tertiary: '#ffffff'
  tertiary-container: '#51b3b2'
  on-tertiary-container: '#004241'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a6'
  on-primary-fixed: '#3f0300'
  on-primary-fixed-variant: '#842415'
  secondary-fixed: '#ffe173'
  secondary-fixed-dim: '#e8c426'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#554500'
  tertiary-fixed: '#93f2f1'
  tertiary-fixed-dim: '#76d6d5'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#00504f'
  background: '#fff9f0'
  on-background: '#1d1b16'
  surface-variant: '#e7e2d9'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-caps:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  stack-gap-sm: 12px
  stack-gap-md: 24px
  stack-gap-lg: 40px
  section-margin: 64px
---

## Brand & Style

The design system is centered on the concept of a "Digital Scrapbook," blending the tactile warmth of physical keepsakes with the dynamic interactivity of a modern mobile experience. It is designed to evoke nostalgia, joy, and the intimate feeling of a handwritten card.

The aesthetic leans into **Soft-Tactile Minimalism**. It avoids the rigidity of corporate grids in favor of organic shapes, gentle overlaps, and physics-based interactions. The goal is to make the user feel like they are unwrapping a gift rather than navigating an interface.

**Visual Principles:**
- **Surprise & Delight:** Subtle shimmer effects on primary actions and "confetti" bursts upon milestone completions.
- **Organic Movement:** Elements utilize spring physics (bouncy transitions) to feel light and responsive.
- **Hand-Touched:** Integration of doodle-style icons and paper-texture overlays to break the digital "glass" barrier.

## Colors

The palette is designed to transition through three distinct emotional phases of the 9-step journey:

1.  **Curiosity (Steps 1-3):** Uses the Neutral Cream (`#FFF9F0`) and Soft Rose (`#F4978E`) to create a calm, inviting atmosphere.
2.  **Nostalgia (Steps 4-6):** Introduces the Dusty Rose and Sepia-toned accents (`#D4A373`) to support photo-sharing and storytelling.
3.  **Celebration (Steps 7-9):** Shifts to full-vibrancy with Coral (`#FF7E67`), Sunny Yellow (`#FFD93D`), and Teal (`#6BCBCA`).

**Color Application:**
- **Backgrounds:** Primarily use the Neutral Cream to keep the interface warm rather than stark white.
- **Shadows:** Never use pure black. Use a 15% opacity version of the Primary or Tertiary color to create "glow" depth.

## Typography

This design system uses a high-contrast typographic pairing to balance playfulness with readability.

- **Headlines:** Uses a chunky, expressive sans-serif with idiosyncratic curves. It should be treated as a decorative element. For major milestones, headlines should use a slight rotation (±2 degrees) to mimic scrapbook stickers.
- **Body & UI:** Uses a rounded sans-serif for maximum approachability. The medium weight is preferred over regular to ensure legibility against textured or colored backgrounds.
- **Text Rendering:** All display text should have a subtle "ink-bleed" feel—avoiding razor-sharp edges where possible through slight weight adjustments.

## Layout & Spacing

The layout follows a **Fluid & Centered** philosophy. Since the journey is a sequence of 9 immersive steps, each screen is treated as a "canvas" rather than a scrollable page.

**Layout Rules:**
- **Vertical Centering:** Primary content (cards, games, photos) should be vertically centered on the mobile viewport.
- **Safe Areas:** Maintain a generous 24px horizontal margin to prevent content from feeling "trapped" by the screen edges.
- **Progressive Disclosure:** Use ample white space (or "cream space") between elements to focus the user’s attention on one task at a time.
- **Adaptive Reflow:** On tablet devices, the container width is capped at 480px to preserve the intimate, handheld feel of a phone.

## Elevation & Depth

This design system eschews traditional material shadows in favor of **Soft-Volume Depth**.

- **Tonal Layers:** Depth is created by stacking lighter surfaces on top of slightly darker, textured backgrounds.
- **Colored Ambient Shadows:** Elevated cards use a wide-spread, low-opacity shadow tinted with the primary coral color `rgba(255, 126, 103, 0.15)`. This creates a "glow" rather than a "drop" shadow.
- **Interactive Depth:** Buttons use a "thick" bottom border (4px) in a darker shade of the button's color to create a 3D tactile effect. When pressed, the element translates 2px downward and the shadow shrinks, simulating a physical push.

## Shapes

The shape language is **Extra-Bulbous**. There are no sharp corners in the entire system.

- **Primary Containers:** Use a minimum radius of 32px to create a soft, friendly frame for content.
- **Interactive Elements:** Buttons and input chips use "full-round" (pill-shaped) corners.
- **Irregularity:** To enhance the "personal" feel, certain decorative elements (like photo frames) should utilize a slightly imperfect `border-radius` (e.g., `60% 40% 50% 50% / 40% 50% 50% 60%`) to look hand-cut.

## Components

### Buttons
The primary action button is a "Bouncy Pill."
- **Idle State:** 4px bottom-offset "3D" shadow, bright coral fill, white bold text.
- **Tap State:** Spring animation scale down (0.95), shadow removal, and a 2px downward translation.
- **Celebration State:** For the final step, the button should have a "Shimmer" gradient moving across it.

### Cards (The "Snap")
The central container for photos and text.
- **Styling:** White background, 32px rounded corners, 1px soft-rose border.
- **Animation:** Enters the screen with a "Pop" (overshoot) transition.

### Progress Indicator (The "Path")
A 9-segment progress bar at the top of the screen.
- **Styling:** Soft, rounded segments. Completed segments turn into small stars; the current segment is a pulsing circle.

### Input Fields
- **Styling:** Background-fill is a 5% opacity version of the primary color. Borders appear only on focus and are 2px thick and secondary yellow.
- **Placeholder:** Uses a playful, conversational tone (e.g., "Tell us a secret...").

### Floating Motifs
- **Doodles:** Hand-drawn stars and hearts that gently float using a sine-wave CSS animation to create a sense of life on the screen.