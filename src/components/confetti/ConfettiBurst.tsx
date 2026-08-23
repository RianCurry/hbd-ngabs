"use client";

import { useEffect, useState } from "react";

const COLORS = ["#fdd73b", "#ffb4a6", "#93f2f1", "#a53b29", "#76d6d5"];

interface Piece {
  left: number;
  color: string;
  drift: number;
  spin: number;
  duration: number;
  delay: number;
  scale: number;
}

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    drift: (Math.random() - 0.5) * 160,
    spin: Math.random() * 720 - 360,
    duration: Math.random() * 2.5 + 2.5,
    delay: Math.random(),
    scale: Math.random() * 0.6 + 0.7,
  }));
}

/**
 * One-shot CSS confetti shower. Random values are generated after mount so
 * server and client markup stay identical (no hydration mismatch).
 */
export default function ConfettiBurst({ count = 80 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    // Generated in a timer callback (not synchronously) so server and client
    // markup stay identical - no hydration mismatch.
    const id = setTimeout(() => setPieces(makePieces(count)), 0);
    return () => clearTimeout(id);
  }, [count]);

  if (pieces.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={
            {
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              width: `${8 * piece.scale}px`,
              height: `${14 * piece.scale}px`,
              animationDelay: `${piece.delay}s`,
              "--duration": `${piece.duration}s`,
              "--drift": `${piece.drift}px`,
              "--spin": `${piece.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
