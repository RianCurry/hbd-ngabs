"use client";

import { motion } from "framer-motion";
import { birthdayContent } from "@/content/birthday";

export default function ClosingScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-6 p-6 min-h-screen text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold text-pink-500"
      >
        {birthdayContent.closingText}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-purple-600"
      >
        {birthdayContent.name}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
        className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
      >
        {birthdayContent.age}
      </motion.p>
    </motion.div>
  );
}
