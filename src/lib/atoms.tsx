import { atom } from "jotai";
import { Cards, GameState, initialGameState } from "./types";

// Hand
export const handAtom = atom<Cards[]>([]);

export const gameStateAtom = atom<GameState>(initialGameState);
