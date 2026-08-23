"use client";

import { motion } from "framer-motion";
import { wishesContent } from "@/content/wishes";

interface WishSceneProps {
  /* Final scene of the flow - onComplete is accepted for compatibility
     with the scene map but is intentionally unused (nothing follows). */
  onComplete: () => void;
}

/* Final scene of the flow - no onComplete navigation needed. */
export default function WishScene({}: WishSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center px-6 pb-16 pt-28"
    >
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
    </motion.div>
  );
}
