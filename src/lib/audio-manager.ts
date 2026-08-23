/* Centralized audio playback for the whole flow.

- Step 1 (game): chiptune BGM loops. Playback starts immediately; browsers
  that reject autoplay fall back to one-shot retry listeners fired on the
  first gesture (the first tic-tac-toe tap).
- Entering step 2 (BOOM reveal): the game BGM stops, a firework SFX plays
  once, then the Happy Birthday music-box BGM takes over and loops through
  the remaining scenes.

The manager is a plain module singleton; React consumers subscribe for
re-renders and call imperative methods on scene events. */

import {
  FIREWORKS_SFX_SRC,
  GAME_BGM_SRC,
  MAIN_BGM_SRC,
  getAudioElement,
} from "@/lib/asset-preloader";

export type AudioPhase = "game" | "reveal" | "main";

/* Events that count as a user activation for autoplay purposes. */
const GESTURE_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

class AudioManager {
  private gameBgm: HTMLAudioElement | null = null;
  private mainBgm: HTMLAudioElement | null = null;
  private sfx: HTMLAudioElement | null = null;
  private phase: AudioPhase | null = null;
  private listeners = new Set<() => void>();
  private disarmGesture: (() => void) | null = null;

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    listener();
    return () => {
      this.listeners.delete(listener);
    };
  }

  isPlaying(): boolean {
    return [this.gameBgm, this.mainBgm, this.sfx].some(
      (el) => el !== null && !el.paused
    );
  }

  /* Step 1 BGM. Playback starts immediately on load; browsers that block
     unsolicited autoplay reject the promise, and the one-shot gesture
     retry below covers that case (music begins on the first tap).
     Downloading is handled by the asset preloader during idle time, so
     the bytes are usually already buffered. Safe to call repeatedly
     (idempotent). */
  playGameBgm(): void {
    if (typeof window === "undefined" || this.phase !== null) return;
    this.phase = "game";
    const el = this.ensureGameBgm();
    el.play().catch(() => this.armGestureRetry());
    this.emit();
  }

  /* BOOM reveal: stop step-1 audio, play the firework SFX once, then chain
     into the looping Happy Birthday BGM. Called from the Continue click, so
     the SFX play() runs inside a user gesture even without prior arming. */
  playRevealSequence(): void {
    if (typeof window === "undefined") return;
    this.disarmGestureRetry();
    this.pauseAll();
    this.phase = "reveal";
    if (!this.sfx) {
      this.sfx = this.createElement(FIREWORKS_SFX_SRC, 0.85);
    }
    this.sfx.currentTime = 0;
    this.sfx.onended = () => {
      this.sfx!.onended = null;
      this.startMainBgm();
    };
    this.sfx.play().catch(() => this.startMainBgm());
    this.emit();
  }

  /* Restart button on the final scene: stop every channel, rewind the
     chiptune BGM and resume it so step 1 sounds fresh again. Runs inside
     the click gesture, so playback passes the autoplay policy directly. */
  restartFlow(): void {
    if (typeof window === "undefined") return;
    this.disarmGestureRetry();
    this.pauseAll();
    this.phase = "game";
    const el = this.ensureGameBgm();
    el.currentTime = 0;
    el.play().catch(() => {});
    this.emit();
  }

  toggle(): void {
    if (this.isPlaying()) {
      this.pauseAll();
    } else {
      this.resumeCurrentPhase();
    }
    this.emit();
  }

  /* Surprise-clip support: silence every channel so the video plays alone.
     Reports whether anything was actually audible before pausing - if the
     user had already muted, nothing is stopped and nothing will be revived
     later. */
  pauseBgm(): boolean {
    const wasPlaying = this.isPlaying();
    if (wasPlaying) {
      this.pauseAll();
      this.emit();
    }
    return wasPlaying;
  }

  /* Restores playback after a clip closes, but only when pauseBgm() had
     actually stopped something (and nothing has been started meanwhile,
     e.g. via the floating mute button). */
  resumeBgm(shouldResume: boolean): void {
    if (!shouldResume || this.isPlaying()) return;
    this.resumeCurrentPhase();
    this.emit();
  }

  destroy(): void {
    this.disarmGestureRetry();
    this.pauseAll();
    this.gameBgm = null;
    this.mainBgm = null;
    this.sfx = null;
    this.phase = null;
  }

  private startMainBgm(): void {
    this.phase = "main";
    if (!this.mainBgm) {
      this.mainBgm = this.createElement(MAIN_BGM_SRC, 0.5, true);
      this.armLoopFallback(this.mainBgm, "main");
    }
    this.mainBgm.currentTime = 0;
    this.mainBgm.play().catch(() => {});
    this.emit();
  }

  /* Grabs the step-1 BGM on demand (first gesture/toggle); the underlying
     element is usually already downloaded by the preloader. */
  private ensureGameBgm(): HTMLAudioElement {
    if (!this.gameBgm) {
      this.gameBgm = this.createElement(GAME_BGM_SRC, 0.4, true);
      this.armLoopFallback(this.gameBgm, "game");
    }
    return this.gameBgm;
  }

  /* Safety net for browsers that ignore the loop flag: when a looping BGM
     track ends while its phase is still active, restart it from zero.
     With working loop=true the ended event never fires, so this stays
     dormant and costs nothing. */
  private armLoopFallback(el: HTMLAudioElement, phase: AudioPhase): void {
    el.onended = () => {
      if (this.phase !== phase || !el.paused) return;
      el.currentTime = 0;
      el.play().catch(() => {});
    };
  }

  /* Retries playback on the first user gesture, then removes itself. */
  private armGestureRetry(): void {
    this.disarmGestureRetry();
    const handler = () => {
      const el = this.ensureGameBgm();
      el.play()
        .then(() => this.disarmGestureRetry())
        .catch(() => {});
      this.emit();
    };
    GESTURE_EVENTS.forEach((event) =>
      window.addEventListener(event, handler)
    );
    this.disarmGesture = () =>
      GESTURE_EVENTS.forEach((event) =>
        window.removeEventListener(event, handler)
      );
  }

  private disarmGestureRetry(): void {
    this.disarmGesture?.();
    this.disarmGesture = null;
  }

  /* Resumes whichever channel the current phase owns, from its paused
     position. Runs inside click gestures (toggle, clip close), so playback
     passes the autoplay policy directly. */
  private resumeCurrentPhase(): void {
    switch (this.phase) {
      case "game":
        /* A click is a user gesture, so the element can be created here. */
        this.ensureGameBgm().play().catch(() => {});
        break;
      case "reveal":
        /* Resume mid-SFX; onended stays attached so the BGM still chains. */
        this.sfx?.play().catch(() => {});
        break;
      case "main":
        this.mainBgm?.play().catch(() => {});
        break;
    }
  }

  private pauseAll(): void {
    [this.gameBgm, this.mainBgm, this.sfx].forEach((el) => el?.pause());
  }

  /* Reuses the element the preloader registered for this URL, so playback
     starts from already-buffered data instead of a second download. */
  private createElement(
    src: string,
    volume: number,
    loop = false
  ): HTMLAudioElement {
    const el = getAudioElement(src);
    el.volume = volume;
    el.loop = loop;
    return el;
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const audioManager = new AudioManager();
