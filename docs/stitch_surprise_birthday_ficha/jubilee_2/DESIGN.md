---
name: Jubilee
colors:
  surface: '#fbf9f1'
  surface-dim: '#dcdad2'
  surface-bright: '#fbf9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ec'
  surface-container: '#f0eee6'
  surface-container-high: '#eae8e0'
  surface-container-highest: '#e4e3db'
  on-surface: '#1b1c17'
  on-surface-variant: '#57423e'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f3f1e9'
  outline: '#8b716d'
  outline-variant: '#dec0ba'
  surface-tint: '#a53b29'
  primary: '#a53b29'
  on-primary: '#ffffff'
  primary-container: '#ff7e67'
  on-primary-container: '#731709'
  inverse-primary: '#ffb4a6'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd664'
  on-secondary-container: '#745c00'
  tertiary: '#33675f'
  on-tertiary: '#ffffff'
  tertiary-container: '#79aea5'
  on-tertiary-container: '#03423b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a6'
  on-primary-fixed: '#3f0300'
  on-primary-fixed-variant: '#842415'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e7c353'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#b7ede3'
  tertiary-fixed-dim: '#9bd1c7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#174f48'
  background: '#fbf9f1'
  on-background: '#1b1c17'
  surface-variant: '#e4e3db'
typography:
  display-hero:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Bricolage Grotesque
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Bricolage Grotesque
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  caption:
    fontFamily: Bricolage Grotesque
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
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
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built on a foundation of **nostalgic playfulness** and **tactile warmth**. It aims to evoke the feeling of a handmade scrapbook or a cherished childhood birthday card. The visual narrative is driven by "kawaii" aesthetics—using soft, plump forms and expressive hand-drawn details to create an emotional connection.

The style is a blend of **Tactile/Skeuomorphic** and **Modern Illustrative** movements. Key characteristics include:
- **Paper-like Surfaces:** Subtle grain and textures that suggest physical materiality.
- **Doodle Ethos:** Hand-drawn stars, hearts, and confetti accents that break the rigid digital grid.
- **Gentle Depth:** Use of soft, colored shadows and layered elements to simulate physical stickers and cards.
- **Narrative Flow:** Each screen acts as a storybook chapter, prioritizing delight and personal touch over pure utility.

## Colors

The color story is dominated by **Peach Fuzz (#ff7e67)** and **Cream (#fffdf5)**, creating a sun-drenched, high-key atmosphere. 

- **Primary (Peach):** Used for key actions, emotional highlights, and branding elements.
- **Secondary (Sunbeam):** Used for rewards, "prize" motifs, and secondary celebratory accents.
- **Tertiary (Mint):** Provides a cooling balance to the warm palette, used for character accents or success states.
- **Neutral (Cream & Brown):** Backgrounds use a warm cream rather than pure white to reduce eye strain and enhance the "paper" feel. Text is rendered in a deep, warm brown (#4a3728) instead of black to maintain the soft aesthetic.

## Typography

The design system utilizes **Bricolage Grotesque** across all levels. This font’s unique, slightly idiosyncratic letterforms bridge the gap between "technical" and "handcrafted."

- **Headlines:** Should use tighter letter-spacing and heavier weights to feel "bouncy" and impactful.
- **Body Text:** Uses generous line-height to ensure readability against textured backgrounds.
- **Character:** For specific "handwritten" moments (like signatures), a secondary script font may be used sparingly, but for the core interactive experience, Bricolage Grotesque provides the necessary structure and playfulness.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with generous safe margins to ensure content feels like it's "floating" on a page.

- **Desktop/Tablet:** Content is centered in a 600px - 800px max-width container to mimic the aspect ratio of a greeting card or physical photo album.
- **Mobile:** Full-width fluid layout with `24px` horizontal margins.
- **Rhythm:** A base-8 spacing scale is used. However, vertical spacing is often "airy" (`stack-lg`) to allow decorative doodles and character illustrations to occupy the negative space without crowding the functional UI.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Soft Ambient Shadows**.

- **Surfaces:** The primary background is the "base" paper. Cards and containers sit one level above, using a subtle inner glow or a very soft, tinted shadow (e.g., a peach-tinted shadow for a peach button).
- **Shadow Character:** Shadows are never grey or black. They use a darker version of the surface color (multiply blend mode) with a high blur radius (20px+) and low opacity (10-15%) to feel like soft light hitting paper.
- **Z-Index Strategy:** Characters and "stickers" (stars, hearts) often overlap container borders to break the boxy feel of digital layouts and create a sense of physical depth.

## Shapes

The shape language is **ultra-rounded**, avoiding sharp corners entirely to maintain a "safe" and "friendly" feel.

- **Primary Elements:** Buttons and interactive chips use a `rounded-full` (pill) approach.
- **Containers:** Main cards use a minimum of `1.5rem` (24px) corner radius.
- **Doodles:** Hand-drawn elements should have irregular, organic edges rather than perfect geometric vectors.

## Components

### Buttons
Pill-shaped with a distinct "pressable" feel. Primary buttons use the **Peach** fill with white text. They should feature a subtle bottom-heavy shadow to suggest thickness.

### Cards
Soft-bordered containers with a light cream or white background. They include a very fine 1px border in a slightly darker cream or soft peach to define the edge against the background texture.

### Progress Indicators
Represented by "step-through" dots or a soft, rounded progress bar. In the birthday journey, this can be stylized as a "candle-lighting" meter or a path of stars.

### Input Fields
Rounded containers with soft-tinted backgrounds. Focus states should swap the shadow color to the primary peach to provide a warm "glow" effect.

### Chips & Tags
Small, pill-shaped labels used for categories or minor metadata. These use pastel variants of the primary palette (e.g., Soft Pink or Mint) with high-contrast text.

### Decorative Accents
"Sticker" components—stars, hearts, and the dinosaur character—should be treated as UI components with predefined placement logic (e.g., "Top Right Anchor" for a star on a card).