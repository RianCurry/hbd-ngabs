"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { Board, GameResult } from "@/types";
import BouncyButton from "@/components/shared/BouncyButton";
import OverlayCard from "@/components/shared/OverlayCard";
import FloatingDoodles from "@/components/shared/FloatingDoodles";
import ConfettiBurst from "@/components/confetti/ConfettiBurst";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: Board): GameResult {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === "X" ? "win" : "loss";
    }
  }
  if (board.every((cell) => cell !== null)) return "draw";
  return null;
}

/* Pure random selection from the currently empty cells.
   No strategy: the opponent never tries to win or block.
   Returns null only when the board has no empty cells left. */
function getRandomMove(board: Board): number | null {
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

/* Verified local assets in public/images/random/ (URL-safe names).
   GIFs are shown unoptimized to keep their animation.
   Images are purely visual - game state stays "X"/"O". */
const OPPONENT_MOVE_IMAGES = [
  "o.jpg",
  "1109081845759492281.jpg",
  "945052303040563947.jpg",
  "suzumiya-haruhi.jpg",
  "nailong-gif-2.gif",
  "nailong-yellow-dragon-1.gif",
  "nailong-yellow-dragon-5.gif",
];
const WIN_IMAGE = "won.gif";

function randomImageUrl(fileName: string): string {
  return `/images/random/${fileName}`;
}

function pickRandomImage(): string {
  return randomImageUrl(
    OPPONENT_MOVE_IMAGES[Math.floor(Math.random() * OPPONENT_MOVE_IMAGES.length)]
  );
}

interface TicTacToeProps {
  onComplete: () => void;
}

const RESULT_TITLES: Record<Exclude<GameResult, null>, string> = {
  win: "YOU WIN!",
  loss: "YOU LOSE...",
  draw: "IT'S A DRAW!",
};

export default function TicTacToe({ onComplete }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [result, setResult] = useState<GameResult>(null);
  /* Visual only: which random image each Nailong move displays. */
  const [opponentImages, setOpponentImages] = useState<Record<number, string>>({});
  const [resultImage, setResultImage] = useState<string | null>(null);

  /* A full round resolves synchronously in this single handler:
     player move -> win/draw check -> immediate random Nailong move ->
     win/draw check -> control back to the player. No timers, no async
     waiting states, so the game can never get stuck mid-turn. */
  const handlePlayerMove = (index: number) => {
    if (result || board[index]) return;

    // 1. Player move
    const afterPlayer = [...board];
    afterPlayer[index] = "X";

    // 2. Immediate result check for the player's move
    const playerResult = checkWinner(afterPlayer);
    if (playerResult) {
      setBoard(afterPlayer);
      setResult(playerResult);
      setResultImage(
        playerResult === "win" ? randomImageUrl(WIN_IMAGE) : pickRandomImage()
      );
      return; // Nailong does not move
    }

    // 3. Nailong's turn: random empty cell from the UPDATED board
    const nailongMove = getRandomMove(afterPlayer);
    if (nailongMove === null) {
      // Defensive: no empty cells means draw
      setBoard(afterPlayer);
      setResult("draw");
      setResultImage(pickRandomImage());
      return;
    }

    const afterNailong = [...afterPlayer];
    afterNailong[nailongMove] = "O";

    // 4. Immediate result check for Nailong's move
    const nailongResult = checkWinner(afterNailong);
    setBoard(afterNailong);
    setOpponentImages((prev) => ({ ...prev, [nailongMove]: pickRandomImage() }));
    if (nailongResult) {
      setResult(nailongResult);
      setResultImage(
        nailongResult === "win" ? randomImageUrl(WIN_IMAGE) : pickRandomImage()
      );
    }
    // Otherwise control is already back with the player - no flags to restore
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setResult(null);
    setOpponentImages({});
    setResultImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pb-16 pt-28"
    >
      <FloatingDoodles />
      {result === "win" && <ConfettiBurst />}

      {/* Header */}
      <div className="pop-in mb-4 text-center">
        <h2 className="mb-2 font-display text-display-md font-extrabold text-on-surface">
          Let&apos;s start with a game!
        </h2>
        <p className="text-body-lg text-on-surface-variant">
          Beat Nailong to see your surprise. You&apos;re &apos;X&apos;!
        </p>
      </div>

      {/* Board card */}
      <div
        className="pop-in card-depth mx-auto w-full max-w-[300px] rounded-[32px] border border-primary-fixed-dim bg-white p-6"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="grid aspect-square w-full grid-cols-3 gap-2 rounded-2xl bg-surface-variant p-2">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handlePlayerMove(index)}
              disabled={!!cell || !!result}
              aria-label={`Cell ${index + 1}: ${cell || "empty"}`}
              className={`aspect-square rounded-xl bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container ${
                cell || result
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-surface-container-low active:bg-surface-container"
              }`}
            >
              {cell &&
                (cell === "X" ? (
                  <span className="pop-in inline-block font-display text-5xl font-extrabold text-primary md:text-6xl">
                    {cell}
                  </span>
                ) : (
                  <span className="pop-in block h-4/5 w-4/5 overflow-hidden">
                    <Image
                      src={opponentImages[index]}
                      alt="Nailong move"
                      width={160}
                      height={160}
                      unoptimized
                      className="h-full w-full object-contain"
                    />
                  </span>
                ))}
            </button>
          ))}
        </div>
      </div>

      {/* Result modal */}
      <AnimatePresence>
        {result && resultImage && (
          <OverlayCard>
            <h3 className="mt-2 mb-4 text-center font-display text-headline font-bold text-primary">
              {RESULT_TITLES[result]}
            </h3>
            <div className="mb-6 flex w-full justify-center rounded-2xl bg-surface-variant p-2">
              <Image
                src={resultImage}
                alt={RESULT_TITLES[result]}
                width={176}
                height={176}
                unoptimized
                className="h-44 w-44 rounded-xl object-contain shadow-inner"
              />
            </div>
            {result === "win" ? (
              <BouncyButton onClick={onComplete} className="w-full">
                <span>Continue</span>
                <ArrowRight size={24} strokeWidth={3} aria-hidden />
              </BouncyButton>
            ) : (
              <BouncyButton variant="muted" onClick={resetGame} className="w-full">
                <RotateCcw size={22} strokeWidth={3} aria-hidden />
                <span>Try Again</span>
              </BouncyButton>
            )}
          </OverlayCard>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
