"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { prize1 } from "@/content/prizes";

interface PrizeSceneProps {
  onComplete: () => void;
}

export default function PrizeScene({ onComplete }: PrizeSceneProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-8 p-6 min-h-screen justify-center"
    >
      <h2 className="text-2xl font-bold">A Gift for You!</h2>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="box"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-40 h-40 bg-gradient-to-b from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer"
            aria-label="Open gift box"
          >
            <Gift size={64} className="text-white" />
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-64 p-6 bg-white rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-xl font-bold mb-2">{prize1.title}</h3>
            <p className="text-gray-600">{prize1.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Continue
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
