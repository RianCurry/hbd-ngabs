"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { journeyItems } from "@/content/journey";

interface JourneySceneProps {
  onComplete: () => void;
}

export default function JourneyScene({ onComplete }: JourneySceneProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-6 p-6 min-h-screen"
    >
      <h2 className="text-2xl font-bold">The Journey</h2>

      <div className="relative w-full max-w-md">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300" />

        {journeyItems.map((item, index) => (
          <motion.div
            key={item.period}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative pl-14 pb-8"
          >
            <div className="absolute left-4 w-5 h-5 bg-pink-500 rounded-full border-4 border-white shadow" />

            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full text-left"
              aria-expanded={expandedIndex === index}
            >
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-pink-500">{item.period}</span>
                  {expandedIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-2">{item.description}</p>
                      {item.image && (
                        <div className="mt-2 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                          TODO: Image
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors mt-4"
      >
        Continue
      </button>
    </motion.div>
  );
}
