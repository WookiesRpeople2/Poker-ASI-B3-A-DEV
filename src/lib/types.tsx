export type Cards = {
  suit: string;
  rank: string;
};

export type GameState = {
  player1Hand: Cards[];
  player2Hand: Cards[];
  status: "En cours" | "Terminé" | "Attente";
  winner?: string;
};

export const initialGameState: GameState = {
  player1Hand: [],
  player2Hand: [],
  status: "Attente",
};
