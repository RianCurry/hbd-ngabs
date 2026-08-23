"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface OverlayCardProps {
  /** Called when the dimmed backdrop is clicked. Omit to disable. */
  onClose?: () => void;
  /** Show decorative corner sparkles (Stitch game-result modal style). */
  decorated?: boolean;
  children: React.ReactNode;
}

export default function OverlayCard({
  onClose,
  decorated = false,
  children,
}: OverlayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => onClose?.()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pop-in card-depth relative flex w-full max-w-[320px] flex-col items-center overflow-hidden rounded-[32px] border-4 border-white bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {decorated && (
          <>
            <Sparkles
              size={20}
              fill="currentColor"
              strokeWidth={1}
              aria-hidden
              className="absolute left-4 top-4 text-secondary-container"
            />
            <Sparkles
              size={26}
              fill="currentColor"
              strokeWidth={1}
              aria-hidden
              className="absolute right-6 top-6 text-primary-fixed-dim"
            />
          </>
        )}
        {children}
      </div>
    </motion.div>
  );
}
