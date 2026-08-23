"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memories } from "@/content/memories";
import type { Memory } from "@/types";

interface CakeSceneProps {
  onComplete: () => void;
}

interface CandleProps {
  index: number;
  isLit: boolean;
  onExtinguish: () => void;
}

function Candle({ index, isLit, onExtinguish }: CandleProps) {
  return (
    <button
      onClick={onExtinguish}
      disabled={!isLit}
      aria-label={`Candle ${index + 1}: ${isLit ? "lit, tap to blow" : "extinguished"}`}
      className="relative flex flex-col items-center group"
    >
      <div className="relative">
        {isLit && (
          <motion.div
            animate={{ scaleY: [1, 1.2, 1], scaleX: [1, 0.9, 1] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
            className="text-2xl mb-1"
          >
            🔥
          </motion.div>
        )}
        <div className="w-3 h-10 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm mx-auto" />
      </div>
      <span className="text-xs mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        tap
      </span>
    </button>
  );
}

interface MemoryModalProps {
  memory: Memory;
  onClose: () => void;
}

function MemoryModal({ memory, onClose }: MemoryModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
      >
        <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
        <p className="text-gray-600 mb-4">{memory.description}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors w-full"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function CakeScene({ onComplete }: CakeSceneProps) {
  const [litCandles, setLitCandles] = useState<boolean[]>(
    () => new Array(memories.length).fill(true)
  );
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);

  const handleExtinguish = useCallback(
    (index: number) => {
      if (!litCandles[index]) return;

      const newLit = [...litCandles];
      newLit[index] = false;
      setLitCandles(newLit);
      setActiveMemory(memories[index]);
    },
    [litCandles]
  );

  const allExtinguished = litCandles.every((lit) => !lit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-8 p-6 min-h-screen justify-center"
    >
      <h2 className="text-2xl font-bold">Make a Wish!</h2>
      <p className="text-sm text-gray-500">Blow out the candles to unlock memories</p>

      <div className="relative">
        <div className="w-48 h-32 md:w-64 md:h-44 bg-gradient-to-b from-amber-200 to-amber-400 rounded-t-3xl flex items-end justify-center pb-4">
          <div className="w-40 md:w-56 h-8 bg-gradient-to-b from-amber-300 to-amber-500 rounded-lg" />
        </div>

        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
          {litCandles.map((isLit, index) => (
            <Candle
              key={index}
              index={index}
              isLit={isLit}
              onExtinguish={() => handleExtinguish(index)}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-400">
        {litCandles.filter((l) => l).length} candles remaining
      </p>

      {allExtinguished && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Continue
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {activeMemory && (
          <MemoryModal memory={activeMemory} onClose={() => setActiveMemory(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
