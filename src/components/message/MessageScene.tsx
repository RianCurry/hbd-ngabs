"use client";

import { motion } from "framer-motion";
import { messageContent } from "@/content/message";

interface MessageSceneProps {
  onComplete: () => void;
}

export default function MessageScene({ onComplete }: MessageSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-8 p-6 min-h-screen justify-center text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md bg-white rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-left">{messageContent.greeting}</h2>
        <p className="text-gray-700 leading-relaxed text-left whitespace-pre-line">
          {messageContent.content}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
