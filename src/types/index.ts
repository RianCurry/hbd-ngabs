export type BirthdayScene =
  | "game"
  | "birthday"
  | "cake"
  | "journey"
  | "my-wish";

export const SCENE_ORDER: BirthdayScene[] = [
  "game",
  "birthday",
  "cake",
  "journey",
  "my-wish",
];

export type CellValue = "X" | "O" | null;
export type Board = CellValue[];
export type GameResult = "win" | "loss" | "draw" | null;

export interface JourneyItem {
  period: string;
  title: string;
  description: string;
  images: string[];
}

export interface Memory {
  id: number;
  title: string;
  description: string;
  image: string;
}
