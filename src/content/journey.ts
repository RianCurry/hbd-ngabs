import type { JourneyItem } from "@/types";

/* Step 4: period label + keyword-named photos only (no title/description). */
export const journeyItems: JourneyItem[] = [
  {
    period: "MTS",
    title: "",
    description: "",
    images: ["1724760702595.jpg"].map((file) => `/images/gallery/${file}`),
  },
  {
    period: "SMK/SMA",
    title: "",
    description: "",
    images: ["smk1.jpg", "smk2.jpg", "smk3.jpg"].map(
      (file) => `/images/gallery/${file}`
    ),
  },
  {
    period: "KULIAH",
    title: "",
    description: "",
    images: ["college1.jpg"].map((file) => `/images/gallery/${file}`),
  },
  {
    period: "GALLERY",
    title: "",
    description: "",
    images: ["now1.jpg", "now2.jpg"].map((file) => `/images/gallery/${file}`),
  },
];
