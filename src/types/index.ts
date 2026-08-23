export type BirthdayScene =
  | "game"
  | "birthday"
  | "cake"
  | "prize-1"
  | "journey"
  | "my-wish"
  | "message"
  | "prize-2"
  | "closing";

export const SCENE_ORDER: BirthdayScene[] = [
  "game",
  "birthday",
  "cake",
  "prize-1",
  "journey",
  "my-wish",
  "message",
  "prize-2",
  "closing",
];

export type CellValue = "X" | "O" | null;
export type Board = CellValue[];
export type GameResult = "win" | "loss" | "draw" | null;

export interface JourneyItem {
  period: string;
  title: string;
  description: string;
  image: string;
}

export interface Memory {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Prize {
  title: string;
  description: string;
  image: string;
}
