"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  WISH_DOODLE_IMAGES,
  randomImageUrl,
} from "@/content/game-assets";

/* Fixed anchor points around the viewport edges, away from the centered
   wish card so the stickers never cover text. */
const SLOTS = [
  { position: "top-[13%] left-[3%] sm:left-[6%]", size: 76, rotate: -12 },
  { position: "top-[42%] right-[2%] sm:right-[5%]", size: 92, rotate: 10 },
  { position: "bottom-[16%] left-[4%] sm:left-[8%]", size: 84, rotate: 8 },
  { position: "bottom-[7%] right-[6%] sm:right-[10%]", size: 64, rotate: -9 },
];

interface Doodle {
  src: string;
  position: string;
  size: number;
  rotate: number;
  delay: string;
}

/* Fisher-Yates over the candidate pool, then one image per slot. */
function pickDoodles(): Doodle[] {
  const pool = [...WISH_DOODLE_IMAGES.map(randomImageUrl)];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return SLOTS.map((slot, index) => ({
    src: pool[index % pool.length],
    position: slot.position,
    size: slot.size,
    rotate: slot.rotate,
    delay: `${index * 0.7}s`,
  }));
}

/* Wish-scene backdrop: a few random stickers floating near the screen
   edges. Purely decorative - pointer-events-none keeps taps flowing to
   the scene, low opacity + z-0 keeps them behind the content card. */
export default function WishDoodles() {
  const [doodles, setDoodles] = useState<Doodle[]>([]);

  /* Generated after mount so server and client markup stay identical
     (no hydration mismatch), same trick as ConfettiBurst. */
  useEffect(() => {
    const id = setTimeout(() => setDoodles(pickDoodles()), 0);
    return () => clearTimeout(id);
  }, []);

  if (doodles.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-25"
    >
      {doodles.map((doodle) => (
        <div
          key={doodle.src}
          className={`absolute ${doodle.position}`}
          style={{ transform: `rotate(${doodle.rotate}deg)` }}
        >
          {/* Float animation lives on an inner element because the
              keyframes own `transform`, which would override a rotation
              set on the same node. */}
          <div className="float-doodle" style={{ animationDelay: doodle.delay }}>
            <Image
              src={doodle.src}
              alt=""
              width={doodle.size}
              height={doodle.size}
              unoptimized
              className="h-auto w-auto object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
