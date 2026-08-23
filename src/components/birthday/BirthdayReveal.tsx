"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PartyPopper } from "lucide-react";
import { birthdayContent } from "@/content/birthday";
import BouncyButton from "@/components/shared/BouncyButton";
import ConfettiBurst from "@/components/confetti/ConfettiBurst";

interface BirthdayRevealProps {
  onComplete: () => void;
}

/* Slow-spinning sunburst rays behind the celebration content */
function Sunburst() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 flex h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full opacity-20">
        <g stroke="#fdd73b" strokeWidth="2" strokeLinecap="round">
          {rays.map((angle) => (
            <line key={angle} x1="100" y1="100" x2="100" y2="0" transform={`rotate(${angle} 100 100)`} />
          ))}
        </g>
      </svg>
    </div>
  );
}

const BACKGROUND_SHAPES = [
  { position: "top-[20%] left-[10%]", shape: "rounded-full", color: "bg-secondary-container", size: "h-4 w-4", delay: "0s", opacity: "opacity-70" },
  { position: "top-[15%] right-[15%]", shape: "rotate-45", color: "bg-primary-container", size: "h-6 w-6", delay: "1s", opacity: "opacity-60" },
  { position: "bottom-[30%] left-[20%]", shape: "rounded-full", color: "bg-tertiary-container", size: "h-3 w-3", delay: "0s", opacity: "opacity-80" },
  { position: "bottom-[25%] right-[25%]", shape: "rotate-12 rounded-sm", color: "bg-secondary-fixed", size: "h-5 w-5", delay: "1s", opacity: "opacity-70" },
];

export default function BirthdayReveal({ onComplete }: BirthdayRevealProps) {
  const [displayedAge, setDisplayedAge] = useState(0);

  /* Count-up 0 -> age, starting after the entrance pops (like the Stitch ref) */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    const startTimer = setTimeout(() => {
      let current = 0;
      const target = birthdayContent.age;
      interval = setInterval(() => {
        current += 1;
        setDisplayedAge(current);
        if (current >= target && interval) clearInterval(interval);
      }, Math.max(40, Math.floor(2000 / target)));
    }, 1000);
    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dot-grid relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center"
    >
      <ConfettiBurst />
      <Sunburst />

      {/* Small floating geometric shapes */}
      {BACKGROUND_SHAPES.map((shape) => (
        <div
          key={shape.position}
          aria-hidden
          style={{ animationDelay: shape.delay }}
          className={`float-doodle absolute ${shape.position} ${shape.shape} ${shape.color} ${shape.size} ${shape.opacity} z-0`}
        />
      ))}

      {/* Central celebration stack */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="pop-in flex flex-col items-center" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-outline-coral -rotate-2 font-display text-[17vw] font-extrabold uppercase leading-none tracking-tight sm:text-[64px]">
            {birthdayContent.boomText}
          </h2>
          <h3 className="text-outline-brown mt-3 font-display text-3xl font-extrabold uppercase sm:text-[32px]">
            {birthdayContent.happyText}
          </h3>
        </div>

        {/* Name ribbon */}
        <div className="pop-in relative mt-6 flex h-16 w-full max-w-[280px] items-center justify-center sm:h-20" style={{ animationDelay: "0.3s" }}>
          <div className="absolute inset-0 -rotate-1 rounded-lg border-2 border-white bg-primary-fixed-dim shadow-md" />
          <span className="relative font-display text-3xl font-extrabold uppercase tracking-wider text-white [text-shadow:2px_2px_0_var(--color-primary)] sm:text-4xl">
            {birthdayContent.name}
          </span>
        </div>

        {/* Animated age counter */}
        <p
          className="text-outline-gold pop-in mt-6 font-display font-extrabold leading-none"
          style={{ animationDelay: "0.5s", fontSize: "clamp(64px, 18vw, 80px)" }}
          aria-label={`Age ${birthdayContent.age}`}
        >
          {displayedAge}
        </p>

        {/* Celebrating mascot placeholder (no image asset yet) */}
        <div className="float-doodle pop-in mt-6" style={{ animationDelay: "0.7s" }} aria-hidden>
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary-fixed/50 sm:h-32 sm:w-32">
            <PartyPopper size={56} strokeWidth={1.5} className="text-primary-container" />
          </div>
        </div>

        {/* Continue */}
        <div className="pop-in mt-8 w-full max-w-[240px]" style={{ animationDelay: "0.9s" }}>
          <BouncyButton variant="yellow" onClick={onComplete} className="w-full">
            <span>Let&apos;s Go!</span>
            <ArrowRight size={24} strokeWidth={3} aria-hidden />
          </BouncyButton>
        </div>
      </div>
    </motion.div>
  );
}
