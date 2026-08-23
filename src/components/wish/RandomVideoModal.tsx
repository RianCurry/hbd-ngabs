"use client";

import { Clapperboard } from "lucide-react";
import BouncyButton from "@/components/shared/BouncyButton";
import OverlayCard from "@/components/shared/OverlayCard";

interface RandomVideoModalProps {
  src: string;
  onClose: () => void;
}

/* Only mounted while a clip is open, so the <video> element (and its
   download) is created on open and fully released on close. */
export default function RandomVideoModal({
  src,
  onClose,
}: RandomVideoModalProps) {
  return (
    <OverlayCard onClose={onClose}>
      <h3 className="mt-2 mb-4 flex items-center gap-2 text-center font-display text-headline font-bold text-primary">
        <Clapperboard size={22} aria-hidden />
        <span>Kejutan Random!</span>
      </h3>
      <video
        src={src}
        controls
        autoPlay
        playsInline
        preload="none"
        className="mb-5 max-h-[55svh] w-full rounded-2xl bg-black"
      />
      <BouncyButton variant="muted" onClick={onClose} className="w-full">
        Tutup
      </BouncyButton>
    </OverlayCard>
  );
}
