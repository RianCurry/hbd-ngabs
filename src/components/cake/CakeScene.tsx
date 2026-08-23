"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { memories } from "@/content/memories";
import type { Memory } from "@/types";
import BouncyButton from "@/components/shared/BouncyButton";
import OverlayCard from "@/components/shared/OverlayCard";
import FloatingDoodles from "@/components/shared/FloatingDoodles";

interface CakeSceneProps {
  onComplete: () => void;
}

/* ---------- SVG cake geometry (adapted from the Stitch reference) ---------- */

const CANDLE_COLORS = ["#93f2f1", "#ffb4a6", "#ffe173"];
const TOP_TIER_SURFACE_Y = 100;

interface CandleSpot {
  /** SVG x coordinate */
  x: number;
  height: number;
  color: string;
}

/** Distributes candles evenly across the top tier, data-driven by memory count. */
function getCandleLayout(count: number): CandleSpot[] {
  const startX = 112;
  const endX = 208;
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    return {
      x: startX + t * (endX - startX),
      height: 34 + (i % 3) * 6,
      color: CANDLE_COLORS[i % CANDLE_COLORS.length],
    };
  });
}

function svgToPercent({ x, tipY }: { x: number; tipY: number }) {
  return {
    leftPct: (x / 320) * 100,
    topPct: ((tipY - 30) / 250) * 100,
  };
}

/* --------------------------------- Candles -------------------------------- */

interface CandleFlameProps {
  index: number;
  isLit: boolean;
  leftPct: number;
  topPct: number;
  onExtinguish: () => void;
}

function CandleFlame({ index, isLit, leftPct, topPct, onExtinguish }: CandleFlameProps) {
  return (
    <>
      <button
        type="button"
        onClick={onExtinguish}
        disabled={!isLit}
        aria-label={`Candle ${index + 1}: ${isLit ? "lit, tap to blow out" : "extinguished"}`}
        style={{ left: `${leftPct}%`, top: `${topPct}%` }}
        className="absolute z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container disabled:cursor-default"
      >
        {isLit && (
          <motion.span
            animate={{ scaleY: [1, 1.18, 1], scaleX: [1, 0.92, 1] }}
            transition={{ duration: 0.35, repeat: Infinity, repeatType: "reverse" }}
            className="block"
          >
            <Flame
              size={24}
              fill="#ffe173"
              className="text-secondary-fixed drop-shadow-[0_0_6px_rgba(255,126,103,0.9)]"
              aria-hidden
            />
          </motion.span>
        )}
      </button>
      {!isLit && (
        <span
          aria-hidden
          className="smoke-puff"
          style={{ left: `${leftPct}%`, top: `${topPct}%` }}
        />
      )}
    </>
  );
}

/* ------------------------------ Memory modal ------------------------------ */

interface MemoryModalProps {
  memory: Memory;
  onClose: () => void;
}

function MemoryModal({ memory, onClose }: MemoryModalProps) {
  return (
    <OverlayCard onClose={onClose}>
      <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden rounded-xl shadow-inner">
        <Image
          src={memory.image}
          alt={`Memory ${memory.id}`}
          fill
          sizes="(max-width: 480px) 90vw, 340px"
          unoptimized
          className="object-cover"
        />
      </div>
      <BouncyButton onClick={onClose} className="mt-4 w-full">
        Continue
      </BouncyButton>
    </OverlayCard>
  );
}

/* -------------------------------- Scene ---------------------------------- */

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
  const litCount = litCandles.filter(Boolean).length;
  const candleSpots = getCandleLayout(memories.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pb-16 pt-28"
    >
      <FloatingDoodles />

      {/* Instruction */}
      <div className="pop-in mb-2 text-center">
        <h2
          className={`mb-2 font-display text-display-md font-extrabold ${
            allExtinguished ? "text-tertiary-container" : "text-on-surface"
          }`}
        >
          {allExtinguished ? "Hooray, you did it!" : "Make a Wish!"}
        </h2>
        <p className="text-body-lg text-on-surface-variant">
          {allExtinguished ? "All candles are out." : "Blow out the candles to unlock memories"}
        </p>
      </div>

      {/* Cake card */}
      <div
        className="pop-in mt-4 w-full max-w-[340px] rounded-[2rem] border border-outline-variant/30 bg-white p-4 shadow-sm"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="relative mx-auto aspect-[4/3] w-full">
          {/* Soft glow behind the cake */}
          <div
            aria-hidden
            className="absolute inset-0 scale-110 rounded-full bg-secondary-container/20 blur-3xl"
          />

          {/* Tiered cake artwork */}
          <svg
            viewBox="0 30 320 250"
            preserveAspectRatio="xMidYMax meet"
            className="relative z-10 h-auto w-full"
            aria-hidden
          >
            {/* Plate */}
            <ellipse cx="160" cy="270" fill="#f6f0e7" rx="140" ry="25" stroke="#dec0ba" strokeWidth="4" />
            <ellipse cx="160" cy="275" fill="#fff9f0" rx="130" ry="20" />

            {/* Bottom tier */}
            <rect fill="#fca5a5" height="90" rx="10" width="220" x="50" y="170" />
            <rect fill="#fff" height="15" width="220" x="50" y="190" />
            <rect fill="#fff" height="15" width="220" x="50" y="225" />
            <path
              d="M 45 170 C 45 160, 275 160, 275 170 C 275 180, 265 195, 255 190 C 245 185, 240 175, 230 175 C 220 175, 215 195, 205 195 C 195 195, 190 180, 180 180 C 170 180, 165 200, 155 195 C 145 190, 140 175, 130 175 C 120 175, 115 190, 105 190 C 95 190, 90 175, 80 175 C 70 175, 65 195, 55 190 C 45 185, 45 170, 45 170 Z"
              fill="#5c3a21"
            />
            <ellipse cx="160" cy="170" fill="#6e4528" rx="115" ry="15" />

            {/* Top tier */}
            <rect fill="#fca5a5" height="70" rx="8" width="160" x="80" y="100" />
            <rect fill="#fff" height="12" width="160" x="80" y="120" />
            <rect fill="#fff" height="12" width="160" x="80" y="145" />
            <path
              d="M 75 100 C 75 90, 245 90, 245 100 C 245 110, 235 125, 225 120 C 215 115, 210 105, 200 105 C 190 105, 185 120, 175 120 C 165 120, 160 105, 150 105 C 140 105, 135 125, 125 120 C 115 115, 110 105, 100 105 C 90 105, 85 120, 75 115 C 65 110, 75 100, 75 100 Z"
              fill="#5c3a21"
            />
            <ellipse cx="160" cy="100" fill="#6e4528" rx="85" ry="12" />

            {/* Interactive candles (data-driven) */}
            {candleSpots.map((spot) => (
              <g key={`${spot.x}-${spot.height}`} stroke="#333" strokeWidth="1.5">
                <rect
                  fill={spot.color}
                  height={spot.height}
                  rx="2"
                  width="8"
                  x={spot.x - 4}
                  y={TOP_TIER_SURFACE_Y - spot.height}
                />
              </g>
            ))}
          </svg>

          {/* Flame hit areas (percent-mapped over the SVG viewport) */}
          {candleSpots.map((spot, index) => {
            const { leftPct, topPct } = svgToPercent({
              x: spot.x,
              tipY: TOP_TIER_SURFACE_Y - spot.height,
            });
            return (
              <CandleFlame
                key={`flame-${index}`}
                index={index}
                isLit={litCandles[index]}
                leftPct={leftPct}
                topPct={topPct}
                onExtinguish={() => handleExtinguish(index)}
              />
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div
        className="pop-in mt-6 flex flex-col items-center"
        style={{ animationDelay: "0.3s" }}
        aria-live="polite"
      >
        <p className="font-display text-headline font-bold tracking-widest text-primary">
          {litCount} / {memories.length} candles
        </p>

        {allExtinguished && (
          <BouncyButton onClick={onComplete} className="mt-4 w-full max-w-[280px]">
            Continue
          </BouncyButton>
        )}
      </div>

      {/* Memory unlock modal */}
      <AnimatePresence>
        {activeMemory && (
          <MemoryModal memory={activeMemory} onClose={() => setActiveMemory(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
