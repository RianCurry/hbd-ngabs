import type { JourneyItem } from "@/types";

/* Step 4: period label + keyword-named photos only (no title/description).
   Photos come from public/images/gallery/ (committed since e236c8c):
   - SMP-era photos represent the MTS period (same school level)
   - college2.jpg completes the KULIAH period
   - remaining unused photos (candleN,M.jpg variants) form the GALLERY */
export const journeyItems: JourneyItem[] = [
  {
    period: "MTS",
    title: "",
    description: "",
    images: ["smp1.jpg", "smp2.jpg"].map(
      (file) => `/images/gallery/${file}`
    ),
  },
  {
    period: "SMK/SMA",
    title: "",
    description: "",
    images: ["smk1.webp", "smk2.webp", "smk3.webp"].map(
      (file) => `/images/gallery/${file}`
    ),
  },
  {
    period: "KULIAH",
    title: "",
    description: "",
    images: ["college1.webp", "college2.jpg"].map(
      (file) => `/images/gallery/${file}`
    ),
  },
  {
    period: "GALLERY",
    title: "",
    description: "",
    images: [
      "candle1,1.jpg",
      "candle1,2.jpg",
      "candle1,3.jpg",
      "candle3,1.jpg",
      "candle3,2.jpg",
    ].map((file) => `/images/gallery/${file}`),
  },
];
