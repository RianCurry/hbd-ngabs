"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";
import type { BirthdayScene } from "@/types";
import { SCENE_ORDER } from "@/types";
import TicTacToe from "@/components/game/TicTacToe";
import BirthdayReveal from "@/components/birthday/BirthdayReveal";
import CakeScene from "@/components/cake/CakeScene";
import JourneyScene from "@/components/journey/JourneyScene";
import WishScene from "@/components/wish/WishScene";
import AudioControl from "@/components/shared/AudioControl";
import FireworksTransition from "@/components/confetti/FireworksTransition";
import { audioManager } from "@/lib/audio-manager";

const sceneComponents: Record<BirthdayScene, React.FC<{ onComplete: () => void }>> = {
  game: TicTacToe,
  birthday: BirthdayReveal,
  cake: CakeScene,
  journey: JourneyScene,
  "my-wish": WishScene,
};

/* Longest possible fireworks run (last burst delay 320ms + particle 830ms),
   plus margin, before the overlay unmounts. */
const FIREWORKS_VISIBLE_MS = 1400;

export default function SceneController() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  /* Key of the currently playing transition effect; null = idle. */
  const [fireworksKey, setFireworksKey] = useState<number | null>(null);
  const currentScene = SCENE_ORDER[currentSceneIndex];

  /* Single centralized scene-change path: every scene's onComplete lands
     here. A successful advance fires one fireworks burst, then the normal
     AnimatePresence crossfade plays. Non-navigation buttons and in-scene
     actions never call goNext, so they stay firework-free. */
  const goNext = useCallback(() => {
    if (currentSceneIndex < SCENE_ORDER.length - 1) {
      /* Entering the BOOM reveal: firework SFX chained into the Happy
         Birthday BGM, synced with the visual fireworks below. */
      if (SCENE_ORDER[currentSceneIndex + 1] === "birthday") {
        audioManager.playRevealSequence();
      }
      setFireworksKey((key) => (key ?? 0) + 1);
      setCurrentSceneIndex((prev) => prev + 1);
    }
  }, [currentSceneIndex]);

  /* Step 1 chiptune BGM; starts on the first user gesture via the manager.
     Idempotent - the manager ignores repeat calls once a phase is active. */
  useEffect(() => {
    audioManager.playGameBgm();
  }, [currentScene]);

  /* Auto-cleanup: the overlay always unmounts, even if the user sprints to
     the next scene mid-effect (the key remount replaces it cleanly). */
  useEffect(() => {
    if (fireworksKey === null) return;
    const id = setTimeout(() => setFireworksKey(null), FIREWORKS_VISIBLE_MS);
    return () => clearTimeout(id);
  }, [fireworksKey]);

  const SceneComponent = sceneComponents[currentScene];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AudioControl />

      {/* Sticky step header (Stitch top-app-bar style) */}
      <header className="pointer-events-none fixed left-1/2 top-0 z-40 w-full max-w-[480px] -translate-x-1/2 bg-background px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full text-primary">
            <PartyPopper size={24} aria-hidden />
          </div>
          <div className="flex flex-1 flex-col items-center">
            <h1 className="font-display text-headline font-bold text-primary">
              Step {currentSceneIndex + 1} of {SCENE_ORDER.length}
            </h1>
            <div className="mt-1 flex gap-1" aria-hidden>
              {SCENE_ORDER.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === currentSceneIndex
                      ? "animate-pulse bg-primary"
                      : i < currentSceneIndex
                        ? "bg-primary"
                        : "bg-surface-variant"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Spacer balances the left icon */}
          <div className="h-12 w-12" />
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SceneComponent onComplete={goNext} />
        </motion.div>
      </AnimatePresence>

      {/* Transition fireworks - non-interactive overlay above scene content,
          below modal dialogs (z-50 vs z-[60]). Keyed so re-triggers remount
          a fresh effect instead of accumulating particles. */}
      {fireworksKey !== null && <FireworksTransition key={fireworksKey} />}
    </div>
  );
}
