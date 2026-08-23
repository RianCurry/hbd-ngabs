"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioManager } from "@/lib/audio-manager";

export default function AudioControl() {
  const [isPlaying, setIsPlaying] = useState(false);

  /* Reflects the shared manager state (game BGM, reveal SFX chain, or the
     Happy Birthday BGM) instead of owning its own element. */
  useEffect(() => audioManager.subscribe(() => setIsPlaying(audioManager.isPlaying())), []);

  useEffect(() => () => audioManager.destroy(), []);

  return (
    <button
      onClick={() => audioManager.toggle()}
      aria-label={isPlaying ? "Mute audio" : "Play audio"}
      className="fixed bottom-4 right-4 z-50 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
