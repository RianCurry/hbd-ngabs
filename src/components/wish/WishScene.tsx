"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, RotateCcw } from "lucide-react";
import { wishesContent } from "@/content/wishes";
import { WISH_VIDEO_URLS } from "@/content/game-assets";
import { audioManager } from "@/lib/audio-manager";
import BouncyButton from "@/components/shared/BouncyButton";
import WishDoodles from "@/components/shared/WishDoodles";

/* Code-split: the video modal chunk is only fetched on the first press. */
const RandomVideoModal = dynamic(
  () => import("@/components/wish/RandomVideoModal")
);

interface WishSceneProps {
  /* Final scene of the flow - onComplete is accepted for compatibility
     with the scene map but is intentionally unused (nothing follows). */
  onComplete: () => void;
  /* Wired only on this scene by SceneController: replays the flow
     from step 1, including a fresh start of the chiptune BGM. */
  onRestart?: () => void;
}

/* Final scene of the flow - no onComplete navigation needed. */
export default function WishScene({ onRestart }: WishSceneProps) {
  /* src of the currently open random clip; null = modal closed. */
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  /* Keeps the next pick from repeating the clip just watched. */
  const lastVideoIndexRef = useRef<number | null>(null);
  /* Whether the manager was audibly playing when the clip opened, so BGM
     is only revived on close if this press actually silenced it. */
  const bgmWasPlayingRef = useRef(false);

  const openRandomVideo = () => {
    const choices = WISH_VIDEO_URLS.map((_, index) => index).filter(
      (index) => index !== lastVideoIndexRef.current
    );
    const picked = choices[Math.floor(Math.random() * choices.length)];
    lastVideoIndexRef.current = picked;
    bgmWasPlayingRef.current = audioManager.pauseBgm();
    setVideoSrc(WISH_VIDEO_URLS[picked]);
  };

  const closeRandomVideo = () => {
    setVideoSrc(null);
    audioManager.resumeBgm(bgmWasPlayingRef.current);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center px-6 pb-16 pt-28"
    >
      <WishDoodles />

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 font-display text-display-md font-extrabold text-on-surface"
      >
        {wishesContent.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full rounded-2xl bg-white/40 p-8 shadow-lg"
      >
        <p className="whitespace-pre-line text-left text-body-lg leading-relaxed text-on-surface-variant">
          {wishesContent.content}
        </p>
      </motion.div>

      {/* Random surprise clip + replay, stacked below the wish card. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex w-full flex-col items-center gap-4"
      >
        <BouncyButton onClick={openRandomVideo} className="w-[80%] max-w-[240px]">
          <Dices size={22} aria-hidden />
          Random
        </BouncyButton>

        {onRestart && (
          <BouncyButton
            variant="yellow"
            onClick={onRestart}
            className="w-[80%] max-w-[240px]"
          >
            <RotateCcw size={20} aria-hidden />
            Ulangi dari Awal
          </BouncyButton>
        )}
      </motion.div>

      <AnimatePresence>
        {videoSrc && (
          <RandomVideoModal src={videoSrc} onClose={closeRandomVideo} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
