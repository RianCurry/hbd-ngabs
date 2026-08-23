/* Verified local assets in public/images/random/ (URL-safe names).
   All assets are pre-optimized WebP (GIFs re-encoded as animated WebP to
   keep their animation) and served unoptimized - game state stays "X"/"O".
   Shared by the board UI and the asset preloader so both reference the
   exact same URLs. */

export const OPPONENT_MOVE_IMAGES = [
  "o.webp",
  "1109081845759492281.webp",
  "945052303040563947.webp",
  "suzumiya-haruhi.webp",
  "nailong-gif-2.webp",
  "nailong-yellow-dragon-1.webp",
  "nailong-yellow-dragon-5.webp",
];
export const WIN_IMAGE = "won.webp";

/* Lightweight static stickers reused as wish-scene background doodles.
   The heavy animated WebP files stay exclusive to the game board so the
   final scene stays cheap to load on mobile data. */
export const WISH_DOODLE_IMAGES = [
  "o.webp",
  "1109081845759492281.webp",
  "945052303040563947.webp",
  "suzumiya-haruhi.webp",
  "nailong-yellow-dragon-1.webp",
  "nailong-yellow-dragon-5.webp",
  "won.webp",
];

export function randomImageUrl(fileName: string): string {
  return `/images/random/${fileName}`;
}
