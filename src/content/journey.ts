import type { JourneyItem } from "@/types";

/* Step 4: period label + keyword-named photos only (no title/description).
   NOTE: the MTS and GALLERY entries reference photo files that were never
   committed to public/images/gallery/ (1724760702595.jpg, now1.jpg,
   now2.jpg). They are kept as empty image lists until real photos are
   added, so no broken images are rendered. */
export const journeyItems: JourneyItem[] = [
  {
    period: "MTS",
    title: "",
    description: "",
    images: [],
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
    images: ["college1.webp"].map((file) => `/images/gallery/${file}`),
  },
  {
    period: "GALLERY",
    title: "",
    description: "",
    images: [],
  },
];
