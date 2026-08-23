/* Progressive asset preloader.

Strategy - one scene of lookahead, fetched during browser idle time:
- When a scene becomes active, its own assets plus the NEXT scene's assets
  are queued via requestIdleCallback, so the initial render never waits on
  downloads and far-future scenes are never fetched early.
- Images preload through new Image(); audio through new Audio() with
  preload="auto".
- Every URL is registered exactly once and audio elements are shared with
  the audio manager, so repeated calls can never cause duplicate requests.
- No service worker and no custom storage: freshness is guaranteed by
  normal HTTP caching (the server revalidates public/ files), so updated
  assets are always picked up. */

import { journeyItems } from "@/content/journey";
import { memories } from "@/content/memories";
import {
  OPPONENT_MOVE_IMAGES,
  WIN_IMAGE,
  WISH_DOODLE_IMAGES,
  randomImageUrl,
} from "@/content/game-assets";
import { SCENE_ORDER, type BirthdayScene } from "@/types";

/* ------------------------------ Asset sources ----------------------------- */

export const GAME_BGM_SRC = "/audio/bgm-game-suzumiya-v2.mp3";
export const MAIN_BGM_SRC = "/audio/bgm-happy-birthday.mp3";
export const FIREWORKS_SFX_SRC = "/audio/sfx-fireworks.mp3";

/** Assets each scene uses while it is on screen. */
const SCENE_ASSETS: Record<
  BirthdayScene,
  { images: string[]; audio: string[] }
> = {
  game: {
    images: [...OPPONENT_MOVE_IMAGES, WIN_IMAGE].map(randomImageUrl),
    audio: [GAME_BGM_SRC],
  },
  /* The reveal SFX chains straight into the Happy Birthday BGM, so both
     are warmed up while the user is still playing the game. */
  birthday: {
    images: [],
    audio: [FIREWORKS_SFX_SRC, MAIN_BGM_SRC],
  },
  cake: {
    images: memories.map((memory) => memory.image),
    audio: [],
  },
  journey: {
    images: journeyItems.flatMap((item) => item.images),
    audio: [],
  },
  "my-wish": {
    images: WISH_DOODLE_IMAGES.map(randomImageUrl),
    audio: [],
  },
};

/* ------------------------------- Registries ------------------------------- */

const startedImageUrls = new Set<string>();
const audioElements = new Map<string, HTMLAudioElement>();

/** Single shared <audio> element per URL; playback reuses this instance,
    so preloaded bytes feed directly into the first play(). */
export function getAudioElement(src: string): HTMLAudioElement {
  let el = audioElements.get(src);
  if (!el) {
    el = new Audio();
    el.preload = "auto";
    el.src = src;
    audioElements.set(src, el);
  }
  return el;
}

/** Starts one browser-level image fetch per URL (deduped). */
function preloadImage(src: string): void {
  if (startedImageUrls.has(src)) return;
  startedImageUrls.add(src);
  const img = new Image();
  img.src = src;
}

/** Warms every asset a scene needs. Idempotent - safe to call often. */
function preloadSceneAssets(scene: BirthdayScene): void {
  if (typeof window === "undefined") return;
  const { images, audio } = SCENE_ASSETS[scene];
  audio.forEach((src) => getAudioElement(src));
  images.forEach(preloadImage);
}

/* ------------------------------- Scheduling ------------------------------- */

/* Runs after first paint / when the main thread is free; the timeout keeps
   preloading alive on busy devices where idle callbacks fire late. */
function runWhenIdle(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(callback, 300);
  return () => window.clearTimeout(id);
}

/** Called whenever the flow advances to `sceneIndex`: warms that scene's
    assets plus exactly one scene ahead, deferred to idle time. Returns a
    cancel function for effect cleanup. */
export function scheduleScenePreload(sceneIndex: number): () => void {
  const upcoming = [
    SCENE_ORDER[sceneIndex],
    SCENE_ORDER[sceneIndex + 1],
  ].filter((scene): scene is BirthdayScene => scene !== undefined);
  return runWhenIdle(() => upcoming.forEach(preloadSceneAssets));
}
