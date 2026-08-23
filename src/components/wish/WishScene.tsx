"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { wishesContent } from "@/content/wishes";
import BouncyButton from "@/components/shared/BouncyButton";
import WishDoodles from "@/components/shared/WishDoodles";

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
        className="w-full rounded-2xl bg-white p-8 shadow-lg"
      >
        <p className="whitespace-pre-line text-left text-body-lg leading-relaxed text-on-surface-variant">
          {wishesContent.content}
        </p>
      </motion.div>

      {/* Replay the whole experience from step 1. */}
      {onRestart && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <BouncyButton
            variant="yellow"
            onClick={onRestart}
            className="w-[80%] max-w-[240px]"
          >
            <RotateCcw size={20} aria-hidden />
            Ulangi dari Awal
          </BouncyButton>
        </motion.div>
      )}
    </motion.div>
  );
}
