"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/bgm.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <button
      onClick={togglePlay}
      aria-label={isPlaying ? "Mute audio" : "Play audio"}
      className="fixed bottom-4 right-4 z-50 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
