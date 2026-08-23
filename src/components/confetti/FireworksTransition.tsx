"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Same celebration palette as ConfettiBurst (Stitch tokens). */
const COLORS = ["#fdd73b", "#ffb4a6", "#93f2f1", "#a53b29", "#76d6d5", "#ff7e67"];

interface Particle {
  /* Outward travel in px, computed from a random angle */
  tx: number;
  ty: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

interface Burst {
  left: number; /* % of viewport */
  top: number;
  delay: number; /* stagger between bursts */
  particles: Particle[];
}

/* 3-5 small bursts at varying positions. Per-burst delays stay <= 320ms and
   particle animations <= 830ms so the whole effect finishes within ~1150ms. */
function makeBursts(): Burst[] {
  const burstCount = 3 + Math.floor(Math.random() * 3);
  return Array.from({ length: burstCount }, (_, burst) => ({
    // Kept within 12-88% x / 14-80% y so nothing overflows the viewport
    left: 12 + Math.random() * 76,
    top: 14 + Math.random() * 66,
    delay: burst * 0.08,
    particles: Array.from({ length: 12 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 70;
      return {
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 5 + Math.random() * 5,
        duration: 0.55 + Math.random() * 0.28,
        delay: Math.random() * 0.08,
      };
    }),
  }));
}

/**
 * One-shot cute petasan/fireworks overlay for scene transitions.
 * Pure CSS keyframe bursts (no canvas, no extra dependency).
 *
 * Safety: pointer-events-none + aria-hidden, clipped by overflow-hidden so
 * particles never cause horizontal overflow. Renders nothing when
 * prefers-reduced-motion is set.
 */
export default function FireworksTransition() {
  const reducedMotion = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (reducedMotion) return;
    // Generated in a timer callback (not synchronously) so server and client
    // markup stay identical - no hydration mismatch.
    const id = setTimeout(() => setBursts(makeBursts()), 0);
    return () => clearTimeout(id);
  }, [reducedMotion]);

  if (reducedMotion || bursts.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {bursts.map((burst, burstIndex) => (
        <div
          key={burstIndex}
          className="absolute h-0 w-0"
          style={{ left: `${burst.left}%`, top: `${burst.top}%` }}
        >
          <span
            className="firework-flash"
            style={
              {
                animationDelay: `${burst.delay}s`,
              } as React.CSSProperties
            }
          />
          {burst.particles.map((particle, particleIndex) => (
            <span
              key={particleIndex}
              className="firework-particle"
              style={
                {
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  animationDelay: `${burst.delay + particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                  "--tx": `${particle.tx}px`,
                  "--ty": `${particle.ty}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
