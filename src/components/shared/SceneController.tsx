"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BirthdayScene } from "@/types";
import { SCENE_ORDER } from "@/types";
import TicTacToe from "@/components/game/TicTacToe";
import BirthdayReveal from "@/components/birthday/BirthdayReveal";
import CakeScene from "@/components/cake/CakeScene";
import PrizeScene from "@/components/prize/PrizeScene";
import JourneyScene from "@/components/journey/JourneyScene";
import WishScene from "@/components/wish/WishScene";
import MessageScene from "@/components/message/MessageScene";
import Prize2Scene from "@/components/prize/Prize2Scene";
import ClosingScene from "@/components/closing/ClosingScene";
import AudioControl from "@/components/shared/AudioControl";

const sceneComponents: Record<BirthdayScene, React.FC<{ onComplete: () => void }>> = {
  game: TicTacToe,
  birthday: BirthdayReveal,
  cake: CakeScene,
  "prize-1": PrizeScene,
  journey: JourneyScene,
  "my-wish": WishScene,
  message: MessageScene,
  "prize-2": Prize2Scene,
  closing: ClosingScene,
};

export default function SceneController() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const currentScene = SCENE_ORDER[currentSceneIndex];

  const goNext = useCallback(() => {
    if (currentSceneIndex < SCENE_ORDER.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    }
  }, [currentSceneIndex]);

  const SceneComponent = sceneComponents[currentScene];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AudioControl />

      <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-3 py-1.5 shadow-sm">
        <span className="text-xs text-gray-500">
          {currentSceneIndex + 1}/{SCENE_ORDER.length}
        </span>
        <div className="flex gap-1">
          {SCENE_ORDER.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i <= currentSceneIndex ? "bg-pink-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SceneComponent onComplete={goNext} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
