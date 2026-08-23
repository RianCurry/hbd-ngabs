/* Centralized audio playback for the whole flow.

- Step 1 (game): chiptune BGM loops. Browsers reject autoplay before any
  user interaction, so playback is armed with one-shot retry listeners that
  fire on the first gesture (the first tic-tac-toe tap).
- Entering step 2 (BOOM reveal): the game BGM stops, a firework SFX plays
  once, then the Happy Birthday music-box BGM takes over and loops through
  the remaining scenes.

The manager is a plain module singleton; React consumers subscribe for
re-renders and call imperative methods on scene events. */

export type AudioPhase = "game" | "reveal" | "main";

const GAME_BGM_SRC = "/audio/bgm-game-suzumiya.mp3";
const MAIN_BGM_SRC = "/audio/bgm-happy-birthday.mp3";
const FIREWORKS_SFX_SRC = "/audio/sfx-fireworks.mp3";

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

  /* Step 1 BGM; safe to call repeatedly (idempotent). */
  playGameBgm(): void {
    if (typeof window === "undefined" || this.phase !== null) return;
    this.phase = "game";
    if (!this.gameBgm) {
      this.gameBgm = this.createElement(GAME_BGM_SRC, 0.4, true);
    }
    this.gameBgm.play().catch(() => this.armGestureRetry(this.gameBgm!));
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

  toggle(): void {
    if (this.isPlaying()) {
      this.pauseAll();
    } else {
      switch (this.phase) {
        case "game":
          this.gameBgm?.play().catch(() => {});
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
    }
    this.mainBgm.currentTime = 0;
    this.mainBgm.play().catch(() => {});
    this.emit();
  }

  /* Retries playback on the first user gesture, then removes itself. */
  private armGestureRetry(el: HTMLAudioElement): void {
    this.disarmGestureRetry();
    const handler = () => {
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

  private pauseAll(): void {
    [this.gameBgm, this.mainBgm, this.sfx].forEach((el) => el?.pause());
  }

  private createElement(
    src: string,
    volume: number,
    loop = false
  ): HTMLAudioElement {
    const el = new Audio(src);
    el.volume = volume;
    el.loop = loop;
    el.preload = "auto";
    return el;
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const audioManager = new AudioManager();
