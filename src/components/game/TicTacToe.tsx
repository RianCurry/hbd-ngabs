"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { Board, GameResult } from "@/types";

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

function getAIMove(board: Board): number {
  const empty = board
    .map((cell, i) => (cell === null ? i : -1))
    .filter((i) => i !== -1);

  for (const i of empty) {
    const test = [...board];
    test[i] = "O";
    if (checkWinner(test) === "loss") return i;
  }

  for (const i of empty) {
    const test = [...board];
    test[i] = "X";
    if (checkWinner(test) === "win") return i;
  }

  if (empty.includes(4)) return 4;

  const corners = [0, 2, 6, 8].filter((i) => empty.includes(i));
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

  return empty[Math.floor(Math.random() * empty.length)];
}

interface TicTacToeProps {
  onComplete: () => void;
}

export default function TicTacToe({ onComplete }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [result, setResult] = useState<GameResult>(null);
  const [isThinking, setIsThinking] = useState(false);

  const handlePlayerMove = useCallback(
    (index: number) => {
      if (board[index] || !isPlayerTurn || result || isThinking) return;

      const newBoard = [...board];
      newBoard[index] = "X";

      const gameResult = checkWinner(newBoard);
      if (gameResult) {
        setBoard(newBoard);
        setResult(gameResult);
        return;
      }

      setBoard(newBoard);
      setIsPlayerTurn(false);
      setIsThinking(true);
    },
    [board, isPlayerTurn, result, isThinking]
  );

  useEffect(() => {
    if (isPlayerTurn || isThinking) return;

    const timer = setTimeout(() => {
      const aiMove = getAIMove(board);
      const newBoard = [...board];
      newBoard[aiMove] = "O";

      const gameResult = checkWinner(newBoard);
      setBoard(newBoard);
      setIsPlayerTurn(true);
      setIsThinking(false);
      if (gameResult) setResult(gameResult);
    }, 500);
    return () => clearTimeout(timer);
  }, [board, isPlayerTurn, isThinking, result]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setResult(null);
    setIsThinking(false);
  };

  const resultMessage = result === "win" ? "You win!" : result === "loss" ? "You lose!" : "It's a draw!";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-8 p-6"
    >
      <h2 className="text-2xl font-bold">Tic-Tac-Toe</h2>
      <p className="text-sm text-gray-500">Beat the AI to continue!</p>

      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handlePlayerMove(index)}
            disabled={!!cell || !isPlayerTurn || !!result || isThinking}
            aria-label={`Cell ${index + 1}: ${cell || "empty"}`}
            className={`aspect-square flex items-center justify-center text-3xl font-bold rounded-lg border-2 transition-colors ${
              cell === "X"
                ? "bg-blue-100 border-blue-400 text-blue-600"
                : cell === "O"
                  ? "bg-red-100 border-red-400 text-red-600"
                  : "bg-white border-gray-300 hover:border-gray-400 active:bg-gray-100"
            } disabled:cursor-not-allowed`}
          >
            {cell}
          </button>
        ))}
      </div>

      {isThinking && <p className="text-sm text-gray-400 animate-pulse">AI is thinking...</p>}

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xl font-semibold">{resultMessage}</p>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <RotateCcw size={16} />
              Retry
            </button>
            {result === "win" && (
              <button
                onClick={onComplete}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
