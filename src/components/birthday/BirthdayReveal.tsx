"use client";

import { motion } from "framer-motion";
import { birthdayContent } from "@/content/birthday";

interface BirthdayRevealProps {
  onComplete: () => void;
}

export default function BirthdayReveal({ onComplete }: BirthdayRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-6 p-6 min-h-screen text-center"
    >
      <motion.h1
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        className="text-6xl md:text-8xl font-extrabold text-yellow-400 drop-shadow-lg"
      >
        {birthdayContent.boomText}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-pink-500"
      >
        {birthdayContent.happyText}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-4xl md:text-6xl font-bold text-purple-600"
      >
        {birthdayContent.name}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, type: "spring" }}
        className="text-7xl md:text-9xl font-black text-gradient bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
      >
        {birthdayContent.age}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="mt-8"
      >
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors shadow-lg"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}
