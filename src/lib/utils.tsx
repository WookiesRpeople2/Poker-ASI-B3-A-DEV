import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cards, GameState } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const evaluatePokerHand = (counts, values) => {
  const nRet = {
    value: 1,
    status: "Terminé",
    winningString: "High Card",
    winningValue: 0,
  };

  // Check for Four of a Kind
  if (counts.includes(4)) {
    nRet.value = 8;
    nRet.winningString = "Four of a Kind";
    nRet.winningValue = values[counts.indexOf(4)];
  }
  // Check for Three of a Kind
  else if (counts.includes(3)) {
    nRet.value = 6;
    nRet.winningString = "Three of a Kind";
    nRet.winningValue = values[counts.indexOf(3)];
  }
  // Check for Double Pair
  else if (counts.filter((count) => count === 2).length === 2) {
    nRet.value = 5;
    nRet.winningString = "Double Pair";
    nRet.winningValue = Math.max(
      ...values.filter((_, idx) => counts[idx] === 2)
    );
  }
  // Check for One Pair
  else if (counts.includes(2)) {
    nRet.value = 4;
    nRet.winningString = "Pair";
    nRet.winningValue = values[counts.indexOf(2)];
  }
  // If no pairs or better hands, find the high card
  else {
    nRet.winningValue = Math.max(...values.filter((_, idx) => counts[idx] > 0));
  }

  console.log("Hand Evaluation:", nRet);
  return nRet;
};
