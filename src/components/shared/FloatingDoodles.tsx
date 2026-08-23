"use client";

import { Heart, Star, Triangle } from "lucide-react";

const DOODLES = [
  {
    Icon: Star,
    position: "top-32 left-6 sm:left-8",
    color: "text-secondary-container",
    size: 40,
    delay: "0s",
  },
  {
    Icon: Heart,
    position: "top-1/4 right-8 sm:right-12",
    color: "text-primary-fixed-dim",
    size: 32,
    delay: "1s",
  },
  {
    Icon: Triangle,
    position: "bottom-1/3 left-10 sm:left-16",
    color: "text-tertiary-container",
    size: 48,
    delay: "2s",
  },
];

export default function FloatingDoodles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30"
    >
      {DOODLES.map(({ Icon, position, color, size, delay }) => (
        <Icon
          key={position}
          fill="currentColor"
          strokeWidth={1}
          size={size}
          style={{ animationDelay: delay }}
          className={`float-doodle absolute ${position} ${color}`}
        />
      ))}
    </div>
  );
}
