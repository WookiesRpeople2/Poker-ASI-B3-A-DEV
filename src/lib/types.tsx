export type Suit = "Trèfle" | "Carreau" | "Coeur" | "Pique";

export type Cards = {
  suit: Suit;
  rank: string;
  value: number;
};

export type GameState = {
  playersHand: Cards[];
  computersHand: Cards[];
  playersName: string;
  status: "En cours" | "Terminé" | "Attente";
  winngingString: string;
  winningValue: Number;
  winner?: string;
};
