"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Cake,
  ChevronDown,
  ChevronUp,
  School,
  Sparkles,
} from "lucide-react";
import { journeyItems } from "@/content/journey";
import BouncyButton from "@/components/shared/BouncyButton";

interface JourneySceneProps {
  onComplete: () => void;
}

const MEDALLION_STYLES = [
  { circle: "bg-primary", icon: "text-primary-fixed" },
  { circle: "bg-secondary-container", icon: "text-on-secondary-container" },
  { circle: "bg-primary-container", icon: "text-on-primary-container" },
  { circle: "bg-tertiary-container", icon: "text-tertiary-fixed" },
];

const MEDALLION_ICONS = [Cake, School, BookOpen, Sparkles];

const PERIOD_COLORS = ["text-primary", "text-secondary", "text-secondary", "text-primary"];

export default function JourneyScene({ onComplete }: JourneySceneProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-sparkles relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center px-6 pb-16 pt-28"
    >
      {/* Badge + heading */}
      <div className="pop-in flex w-full flex-col items-center text-center">
        <span className="mb-4 inline-block self-start rounded-full bg-surface-variant px-3 py-1 text-label-caps font-bold uppercase tracking-widest text-on-surface-variant">
          The Journey
        </span>
        <h2 className="mb-8 font-display text-display-md font-extrabold tracking-tight text-on-surface md:text-display-lg">
          Your Journey
        </h2>

        {/* Timeline */}
        <div className="relative mb-12 flex w-full flex-col gap-6 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-0.5 before:bg-primary/20">
          {journeyItems.map((item, index) => {
            const MedallionIcon = MEDALLION_ICONS[index % MEDALLION_ICONS.length];
            const medallionStyle = MEDALLION_STYLES[index % MEDALLION_STYLES.length];
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative z-10 flex items-start gap-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md ${medallionStyle.circle}`}
                  aria-hidden
                >
                  <MedallionIcon size={20} strokeWidth={2.5} className={medallionStyle.icon} />
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  aria-expanded={isExpanded}
                  className="flex-1 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-label-caps font-bold uppercase tracking-widest ${PERIOD_COLORS[index % PERIOD_COLORS.length]}`}
                    >
                      {item.period}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={18} aria-hidden className="shrink-0 text-on-surface-variant" />
                    ) : (
                      <ChevronDown size={18} aria-hidden className="shrink-0 text-on-surface-variant" />
                    )}
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {item.images.length > 0 && (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {item.images.map((src) => (
                              <Image
                                key={src}
                                src={src}
                                alt={item.period}
                                width={200}
                                height={200}
                                unoptimized
                                className="aspect-square h-auto w-full rounded-lg border border-outline-variant/30 object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        <BouncyButton variant="yellow" onClick={onComplete} className="w-[80%] max-w-[240px]">
          Continue
        </BouncyButton>
      </div>
    </motion.div>
  );
}
