import { atom } from "jotai";
import { Cards, GameState } from "./types";

// Hand
const initialGameState: GameState = {
  playersHand: [],
  computersHand: [],
  playersName: "",
  winngingString: "",
  winningValue: 0,
  status: "Attente",
};

export const handAtom = atom<Cards[]>([]);

export const gameStateAtom = atom<GameState>(initialGameState);

export const flippedAtom = atom(false);
