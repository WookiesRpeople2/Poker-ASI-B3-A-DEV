export type Cards = {
  suit: string;
  rank: string;
  value: Number;
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
