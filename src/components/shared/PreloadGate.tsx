"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { preloadCriticalAssets } from "@/lib/asset-preloader";

/* The gate never stays up longer than this even on a dead network - the
   idle-time preloader keeps filling gaps afterwards. */
const HARD_CAP_MS = 12000;
/* Minimum time the animation is shown so a warm cache does not flash it. */
const MIN_VISIBLE_MS = 900;

/* Startup overlay: downloads the critical step 1-2 assets while showing a
   playful progress bar, then fades out to reveal the flow. */
export default function PreloadGate() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    let cancelled = false;
    let revealTimer: number | undefined;

    const reveal = () => {
      if (!cancelled) setDone(true);
    };

    const hardCap = window.setTimeout(reveal, HARD_CAP_MS);

    preloadCriticalAssets((fraction) => {
      if (!cancelled) setProgress(fraction);
    }).then(() => {
      const remaining = MIN_VISIBLE_MS - (Date.now() - startedAt);
      revealTimer = window.setTimeout(reveal, Math.max(0, remaining));
    });

    return () => {
      cancelled = true;
      window.clearTimeout(hardCap);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 bg-background px-6"
        >
          <div className="pop-in flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
            <motion.div
              animate={{ rotate: [-8, 8, -8], scale: [1, 1.12, 1] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <PartyPopper size={44} className="text-primary" aria-hidden />
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="font-display text-headline font-bold text-primary">
              Menyiapkan kejutan...
            </h2>
            <div className="h-3 w-[70%] max-w-[260px] overflow-hidden rounded-full bg-surface-variant">
              <motion.div
                animate={{ width: `${Math.round(progress * 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.35 }}
                className="h-full rounded-full bg-secondary-container"
              />
            </div>
            <p
              className="text-body-lg text-on-surface-variant"
              aria-live="polite"
            >
              {Math.round(progress * 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
