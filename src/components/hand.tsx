import { FC, useEffect, useState } from "react";
import { Card } from "./Card";
import { Cards } from "../lib/types";

type HandProps = {
  playerName: string;
  rHand: Cards[];
};

export const Hand: FC<HandProps> = ({ playerName, rHand }) => {
  const [hand, setHand] = useState<Cards[]>([]);

  useEffect(() => {
    setHand(rHand);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">{playerName}</h2>
      <div className="flex space-x-2">
        {hand.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} />
        ))}
      </div>
    </div>
  );
};
